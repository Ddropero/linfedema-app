import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { F, D } from "../../styles/palette";
import {
  getDeviceId,
  getDeviceInfo,
  isDeviceCertified,
  canAddDevice,
  registerDevice,
  updateLastLogin,
} from "../../utils/deviceManager";
import { verifyTOTPToken } from "../../utils/totpManager";

export default function LoginScreen({ onLogin, onGoToRegister, onGoToTOTPSetup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [showTOTP, setShowTOTP] = useState(false);
  const [totpSecret, setTotpSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loggedUser, setLoggedUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const user = cred.user;

      // Cargar perfil desde Firestore
      const profileRef = doc(db, "users", user.uid);
      const profileSnap = await getDoc(profileRef);

      if (!profileSnap.exists()) {
        setError("Perfil de usuario no encontrado.");
        setLoading(false);
        return;
      }

      const profile = profileSnap.data();

      // --- Flujo para DOCTOR ---
      if (profile.role === "doctor") {
        // Verificar aprobacion
        if (!profile.approved) {
          setError("Cuenta pendiente de aprobacion. Un administrador revisara su solicitud.");
          setLoading(false);
          return;
        }

        // Verificar email
        if (!user.emailVerified) {
          await sendEmailVerification(user);
          setInfo("Se ha enviado un correo de verificacion. Por favor revise su bandeja de entrada.");
          setLoading(false);
          return;
        }

        // Verificar TOTP
        if (profile.totpEnabled) {
          // Si no se ha mostrado el campo TOTP aun, mostrarlo
          if (!showTOTP) {
            setShowTOTP(true);
            setTotpSecret(profile.totpSecret || "");
            setLoggedUser(user);
            setLoading(false);
            return;
          }
          // Si ya se muestra, esperar a que se envie el codigo
        } else {
          // TOTP no configurado, redirigir a setup
          if (onGoToTOTPSetup) {
            onGoToTOTPSetup(user, profile);
          }
          setLoading(false);
          return;
        }
      }

      // --- Flujo para PACIENTE ---
      if (profile.role === "patient") {
        if (!user.emailVerified) {
          await sendEmailVerification(user);
          setInfo("Se ha enviado un correo de verificacion. Por favor revise su bandeja de entrada.");
          setLoading(false);
          return;
        }
      }

      // Verificar dispositivo (solo doctores)
      if (profile.role === "doctor") {
        const deviceId = getDeviceId();
        const certified = await isDeviceCertified(user.uid, deviceId);

        if (!certified) {
          const canAdd = await canAddDevice(user.uid);
          if (!canAdd) {
            setError(
              "Limite de dispositivos alcanzado (maximo 3). Elimine un dispositivo desde su perfil para continuar."
            );
            setLoading(false);
            return;
          }
          const deviceInfo = getDeviceInfo();
          await registerDevice(user.uid, deviceId, deviceInfo);
        } else {
          await updateLastLogin(user.uid, deviceId);
        }
      }

      // Login exitoso
      if (onLogin) onLogin(user, profile);
    } catch (err) {
      const msgs = {
        "auth/user-not-found": "No existe una cuenta con este correo.",
        "auth/wrong-password": "Contrasena incorrecta.",
        "auth/invalid-email": "Correo electronico invalido.",
        "auth/too-many-requests": "Demasiados intentos. Intente mas tarde.",
        "auth/invalid-credential": "Credenciales invalidas.",
      };
      setError(msgs[err.code] || `Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTOTPSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!totpCode || totpCode.length !== 6) {
      setError("Ingrese un codigo de 6 digitos.");
      setLoading(false);
      return;
    }

    const valid = verifyTOTPToken(totpSecret, totpCode);
    if (!valid) {
      setError("Codigo TOTP invalido. Intente nuevamente.");
      setLoading(false);
      return;
    }

    // Verificar dispositivo
    const deviceId = getDeviceId();
    const certified = await isDeviceCertified(loggedUser.uid, deviceId);

    if (!certified) {
      const canAdd = await canAddDevice(loggedUser.uid);
      if (!canAdd) {
        setError(
          "Limite de dispositivos alcanzado (maximo 3). Elimine un dispositivo desde su perfil."
        );
        setLoading(false);
        return;
      }
      const deviceInfo = getDeviceInfo();
      await registerDevice(loggedUser.uid, deviceId, deviceInfo);
    } else {
      await updateLastLogin(loggedUser.uid, deviceId);
    }

    const profileRef = doc(db, "users", loggedUser.uid);
    const profileSnap = await getDoc(profileRef);
    const profile = profileSnap.data();

    if (onLogin) onLogin(loggedUser, profile);
    setLoading(false);
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: D.bg,
      fontFamily: F.b,
      padding: 20,
    },
    card: {
      background: D.card,
      border: `1px solid ${D.bdr}`,
      borderRadius: 16,
      padding: 40,
      width: "100%",
      maxWidth: 420,
      backdropFilter: "blur(20px)",
    },
    title: {
      fontFamily: F.d,
      color: D.tx,
      fontSize: 24,
      marginBottom: 8,
      textAlign: "center",
    },
    subtitle: {
      color: D.txM,
      fontSize: 14,
      textAlign: "center",
      marginBottom: 28,
    },
    label: {
      color: D.txM,
      fontSize: 12,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 6,
      display: "block",
    },
    input: {
      width: "100%",
      padding: "12px 14px",
      background: "rgba(255,255,255,0.05)",
      border: `1px solid ${D.bdr}`,
      borderRadius: 8,
      color: D.tx,
      fontSize: 15,
      fontFamily: F.b,
      marginBottom: 18,
      outline: "none",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "13px 0",
      background: D.ac,
      color: "#0f172a",
      border: "none",
      borderRadius: 8,
      fontSize: 15,
      fontWeight: 700,
      fontFamily: F.b,
      cursor: "pointer",
      marginTop: 4,
      opacity: loading ? 0.6 : 1,
    },
    error: {
      background: "rgba(239,68,68,0.12)",
      border: "1px solid rgba(239,68,68,0.3)",
      color: "#fca5a5",
      padding: "10px 14px",
      borderRadius: 8,
      fontSize: 13,
      marginBottom: 16,
    },
    info: {
      background: "rgba(45,212,191,0.12)",
      border: `1px solid rgba(45,212,191,0.3)`,
      color: D.ac,
      padding: "10px 14px",
      borderRadius: 8,
      fontSize: 13,
      marginBottom: 16,
    },
    link: {
      color: D.ac,
      fontSize: 13,
      cursor: "pointer",
      textAlign: "center",
      marginTop: 16,
      background: "none",
      border: "none",
      fontFamily: F.b,
      textDecoration: "underline",
    },
    demoBox: {
      marginTop: 24,
      padding: "14px 16px",
      background: "rgba(45,212,191,0.06)",
      border: `1px solid ${D.bdr}`,
      borderRadius: 8,
    },
    demoTitle: {
      color: D.txM,
      fontSize: 11,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 8,
    },
    demoLine: {
      color: D.txM,
      fontSize: 12,
      fontFamily: F.m,
      marginBottom: 2,
    },
    totpInput: {
      width: "100%",
      padding: "14px",
      background: "rgba(255,255,255,0.05)",
      border: `1px solid ${D.bdr}`,
      borderRadius: 8,
      color: D.tx,
      fontSize: 24,
      fontFamily: F.m,
      textAlign: "center",
      letterSpacing: 12,
      marginBottom: 18,
      outline: "none",
      boxSizing: "border-box",
    },
  };

  // --- Pantalla de codigo TOTP ---
  if (showTOTP) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Verificacion TOTP</h1>
          <p style={styles.subtitle}>
            Ingrese el codigo de 6 digitos de Google Authenticator
          </p>

          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleTOTPSubmit}>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={totpCode}
              onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              style={styles.totpInput}
              autoFocus
            />
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Verificando..." : "Verificar"}
            </button>
          </form>

          <button
            style={styles.link}
            onClick={() => {
              setShowTOTP(false);
              setTotpCode("");
              setError("");
            }}
          >
            Volver al inicio de sesion
          </button>
        </div>
      </div>
    );
  }

  // --- Pantalla principal de login ---
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Linfedema App</h1>
        <p style={styles.subtitle}>
          Plataforma clinica Dr. David Duque
        </p>

        {error && <div style={styles.error}>{error}</div>}
        {info && <div style={styles.info}>{info}</div>}

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Correo electronico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            style={styles.input}
            required
          />

          <label style={styles.label}>Contrasena</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Su contrasena"
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Iniciando sesion..." : "Iniciar Sesion"}
          </button>
        </form>

        {onGoToRegister && (
          <button style={styles.link} onClick={onGoToRegister}>
            No tiene cuenta? Registrarse
          </button>
        )}

        <div style={styles.demoBox}>
          <div style={styles.demoTitle}>Credenciales de prueba</div>
          <div style={styles.demoLine}>Doctor: demo.doctor@linfedema.app</div>
          <div style={styles.demoLine}>Paciente: demo.paciente@linfedema.app</div>
          <div style={styles.demoLine}>Contrasena: Demo1234!</div>
        </div>
      </div>
    </div>
  );
}
