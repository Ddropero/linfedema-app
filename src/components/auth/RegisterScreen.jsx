import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { F, D } from "../../styles/palette";

export default function RegisterScreen({ onGoToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [registroMedico, setRegistroMedico] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validaciones
    if (!name.trim()) {
      setError("Ingrese su nombre completo.");
      return;
    }
    if (password.length < 8) {
      setError("La contrasena debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contrasenas no coinciden.");
      return;
    }
    if (role === "doctor" && !registroMedico.trim()) {
      setError("El registro medico (Tarjeta Profesional) es obligatorio para medicos.");
      return;
    }

    setLoading(true);

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;

      // Crear documento en Firestore
      const userData = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role,
        approved: role === "patient", // Pacientes auto-aprobados, doctores necesitan aprobacion
        totpEnabled: false,
        devices: [],
        createdAt: serverTimestamp(),
      };

      if (role === "doctor") {
        userData.registroMedico = registroMedico.trim();
      }

      await setDoc(doc(db, "users", user.uid), userData);

      // Enviar verificacion de correo
      await sendEmailVerification(user);

      if (role === "doctor") {
        setSuccess(
          "Cuenta creada exitosamente. Su cuenta sera revisada por un administrador antes de poder acceder. " +
            "Tambien se le ha enviado un correo de verificacion."
        );
      } else {
        setSuccess(
          "Cuenta creada exitosamente. Se ha enviado un correo de verificacion. " +
            "Por favor revise su bandeja de entrada para activar su cuenta."
        );
      }
    } catch (err) {
      const msgs = {
        "auth/email-already-in-use": "Ya existe una cuenta con este correo electronico.",
        "auth/invalid-email": "El correo electronico no es valido.",
        "auth/weak-password": "La contrasena es demasiado debil. Use al menos 8 caracteres.",
      };
      setError(msgs[err.code] || `Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
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
      maxWidth: 460,
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
    roleGroup: {
      display: "flex",
      gap: 12,
      marginBottom: 18,
    },
    roleButton: (selected) => ({
      flex: 1,
      padding: "12px 0",
      background: selected ? "rgba(45,212,191,0.15)" : "rgba(255,255,255,0.03)",
      border: `1px solid ${selected ? D.ac : D.bdr}`,
      borderRadius: 8,
      color: selected ? D.ac : D.txM,
      fontSize: 14,
      fontWeight: 600,
      fontFamily: F.b,
      cursor: "pointer",
      transition: "all 0.2s",
    }),
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
    success: {
      background: "rgba(45,212,191,0.12)",
      border: `1px solid rgba(45,212,191,0.3)`,
      color: D.ac,
      padding: "12px 14px",
      borderRadius: 8,
      fontSize: 13,
      marginBottom: 16,
      lineHeight: 1.5,
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
      display: "block",
      width: "100%",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Crear Cuenta</h1>
        <p style={styles.subtitle}>Registro en Linfedema App</p>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        {!success && (
          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Nombre completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Dr. Juan Perez / Maria Lopez"
              style={styles.input}
              required
            />

            <label style={styles.label}>Correo electronico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              style={styles.input}
              required
            />

            <label style={styles.label}>Tipo de cuenta</label>
            <div style={styles.roleGroup}>
              <button
                type="button"
                style={styles.roleButton(role === "patient")}
                onClick={() => setRole("patient")}
              >
                Paciente
              </button>
              <button
                type="button"
                style={styles.roleButton(role === "doctor")}
                onClick={() => setRole("doctor")}
              >
                Medico
              </button>
            </div>

            {role === "doctor" && (
              <>
                <label style={styles.label}>
                  Registro Medico (Tarjeta Profesional)
                </label>
                <input
                  type="text"
                  value={registroMedico}
                  onChange={(e) => setRegistroMedico(e.target.value)}
                  placeholder="Numero de tarjeta profesional"
                  style={styles.input}
                  required
                />
              </>
            )}

            <label style={styles.label}>Contrasena</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimo 8 caracteres"
              style={styles.input}
              required
            />

            <label style={styles.label}>Confirmar contrasena</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repita su contrasena"
              style={styles.input}
              required
            />

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Creando cuenta..." : "Crear Cuenta"}
            </button>
          </form>
        )}

        {onGoToLogin && (
          <button style={styles.link} onClick={onGoToLogin}>
            Ya tiene cuenta? Iniciar sesion
          </button>
        )}
      </div>
    </div>
  );
}
