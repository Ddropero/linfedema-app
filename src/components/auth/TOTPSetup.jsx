import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { F, D } from "../../styles/palette";
import {
  generateTOTPSecret,
  generateQRCodeURL,
  verifyTOTPToken,
} from "../../utils/totpManager";
import {
  getDeviceId,
  getDeviceInfo,
  registerDevice,
} from "../../utils/deviceManager";

export default function TOTPSetup({ user, userProfile, onComplete }) {
  const [secret, setSecret] = useState("");
  const [qrDataURL, setQrDataURL] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // 1: instrucciones, 2: escanear QR, 3: verificar

  useEffect(() => {
    const init = async () => {
      const newSecret = generateTOTPSecret();
      setSecret(newSecret);
      try {
        const url = await generateQRCodeURL(newSecret, user.email);
        setQrDataURL(url);
      } catch (err) {
        setError("Error al generar el codigo QR: " + err.message);
      }
    };
    init();
  }, [user.email]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    if (!token || token.length !== 6) {
      setError("Ingrese un codigo de 6 digitos.");
      return;
    }

    setLoading(true);

    const valid = verifyTOTPToken(secret, token);
    if (!valid) {
      setError("Codigo invalido. Asegurese de escanear el QR e ingresar el codigo actual.");
      setLoading(false);
      return;
    }

    try {
      // Guardar secreto y activar TOTP en Firestore
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        totpSecret: secret,
        totpEnabled: true,
      });

      // Registrar dispositivo actual como primer dispositivo certificado
      const deviceId = getDeviceId();
      const deviceInfo = getDeviceInfo();
      await registerDevice(user.uid, deviceId, deviceInfo);

      if (onComplete) onComplete();
    } catch (err) {
      setError("Error al guardar la configuracion: " + err.message);
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
      maxWidth: 480,
      backdropFilter: "blur(20px)",
    },
    title: {
      fontFamily: F.d,
      color: D.tx,
      fontSize: 22,
      marginBottom: 8,
      textAlign: "center",
    },
    subtitle: {
      color: D.txM,
      fontSize: 14,
      textAlign: "center",
      marginBottom: 24,
    },
    stepIndicator: {
      display: "flex",
      justifyContent: "center",
      gap: 8,
      marginBottom: 28,
    },
    stepDot: (active) => ({
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: active ? D.ac : "rgba(255,255,255,0.1)",
      transition: "background 0.3s",
    }),
    instructionBox: {
      background: "rgba(45,212,191,0.06)",
      border: `1px solid ${D.bdr}`,
      borderRadius: 10,
      padding: "16px 20px",
      marginBottom: 20,
    },
    instructionTitle: {
      color: D.ac,
      fontSize: 14,
      fontWeight: 700,
      marginBottom: 10,
    },
    instructionStep: {
      color: D.txM,
      fontSize: 13,
      lineHeight: 1.7,
      marginBottom: 4,
    },
    qrContainer: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 20,
    },
    qrImage: {
      borderRadius: 12,
      border: `2px solid ${D.bdr}`,
    },
    secretBox: {
      background: "rgba(255,255,255,0.03)",
      border: `1px solid ${D.bdr}`,
      borderRadius: 8,
      padding: "10px 14px",
      marginBottom: 20,
      textAlign: "center",
    },
    secretLabel: {
      color: D.txM,
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 6,
    },
    secretCode: {
      color: D.ac,
      fontSize: 14,
      fontFamily: F.m,
      letterSpacing: 2,
      wordBreak: "break-all",
    },
    input: {
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
      opacity: loading ? 0.6 : 1,
    },
    secondaryButton: {
      width: "100%",
      padding: "12px 0",
      background: "transparent",
      color: D.ac,
      border: `1px solid ${D.bdr}`,
      borderRadius: 8,
      fontSize: 14,
      fontFamily: F.b,
      cursor: "pointer",
      marginTop: 10,
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
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Configurar Autenticacion</h1>
        <p style={styles.subtitle}>
          Autenticacion de dos factores con Google Authenticator
        </p>

        <div style={styles.stepIndicator}>
          <div style={styles.stepDot(step >= 1)} />
          <div style={styles.stepDot(step >= 2)} />
          <div style={styles.stepDot(step >= 3)} />
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {/* Paso 1: Instrucciones */}
        {step === 1 && (
          <>
            <div style={styles.instructionBox}>
              <div style={styles.instructionTitle}>
                Como configurar Google Authenticator
              </div>
              <div style={styles.instructionStep}>
                1. Descargue Google Authenticator desde App Store o Play Store.
              </div>
              <div style={styles.instructionStep}>
                2. Abra la aplicacion y seleccione "Agregar cuenta" o el icono "+".
              </div>
              <div style={styles.instructionStep}>
                3. Seleccione "Escanear codigo QR".
              </div>
              <div style={styles.instructionStep}>
                4. Escanee el codigo QR que aparecera en el siguiente paso.
              </div>
              <div style={styles.instructionStep}>
                5. Ingrese el codigo de 6 digitos que muestra la app para verificar.
              </div>
            </div>
            <button style={styles.button} onClick={() => setStep(2)}>
              Continuar
            </button>
          </>
        )}

        {/* Paso 2: QR Code */}
        {step === 2 && (
          <>
            <div style={styles.qrContainer}>
              {qrDataURL ? (
                <img
                  src={qrDataURL}
                  alt="Codigo QR para Google Authenticator"
                  width={220}
                  height={220}
                  style={styles.qrImage}
                />
              ) : (
                <div style={{ color: D.txM, padding: 40 }}>
                  Generando codigo QR...
                </div>
              )}
            </div>

            <div style={styles.secretBox}>
              <div style={styles.secretLabel}>
                Clave manual (si no puede escanear)
              </div>
              <div style={styles.secretCode}>{secret}</div>
            </div>

            <button style={styles.button} onClick={() => setStep(3)}>
              Ya escane el codigo
            </button>
            <button style={styles.secondaryButton} onClick={() => setStep(1)}>
              Volver a instrucciones
            </button>
          </>
        )}

        {/* Paso 3: Verificacion */}
        {step === 3 && (
          <form onSubmit={handleVerify}>
            <div
              style={{
                color: D.txM,
                fontSize: 13,
                textAlign: "center",
                marginBottom: 20,
                lineHeight: 1.6,
              }}
            >
              Ingrese el codigo de 6 digitos que aparece en Google Authenticator
              para completar la configuracion.
            </div>

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={token}
              onChange={(e) => setToken(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              style={styles.input}
              autoFocus
            />

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Verificando..." : "Verificar y Activar"}
            </button>
            <button
              type="button"
              style={styles.secondaryButton}
              onClick={() => setStep(2)}
            >
              Volver al codigo QR
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
