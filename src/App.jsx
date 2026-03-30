import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import useFirebaseAuth from "./hooks/useFirebaseAuth";
import { LoginScreen, RegisterScreen, TOTPSetup } from "./components/auth";
import PatientPortal from "./components/patient";
import DoctorPortal from "./components/doctor";
import { F, P, D } from "./styles/palette";

/* ════════════════════════════════════════════════════════════════
   LINFEDEMA INTEGRAL v5.0 — DR. DAVID DUQUE
   Firebase Auth + TOTP 2FA + Device Management
   ════════════════════════════════════════════════════════════════ */

export default function App() {
  const { user, userProfile, loading } = useFirebaseAuth();
  const [portal, setPortal] = useState(null);
  const [screen, setScreen] = useState("login");

  const handleLogout = async () => {
    await signOut(auth);
    setPortal(null);
    setScreen("login");
  };

  // Loading state
  if (loading) return <div style={{ minHeight: "100vh", background: "#0c1117", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>💧</div>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, fontFamily: F.b }}>Cargando...</p>
    </div>
  </div>;

  // Not authenticated
  if (!user || !userProfile) {
    if (screen === "register") return <RegisterScreen onBack={() => setScreen("login")} onRegistered={() => setScreen("login")} />;
    return <LoginScreen onLogin={() => {}} onRegister={() => setScreen("register")} />;
  }

  // Doctor needs TOTP setup
  if (userProfile.role === "doctor" && userProfile.approved && !userProfile.totpEnabled) {
    return <TOTPSetup user={user} userProfile={userProfile} onComplete={() => window.location.reload()} />;
  }

  // Doctor not approved
  if (userProfile.role === "doctor" && !userProfile.approved) {
    return <div style={{ minHeight: "100vh", background: "#0c1117", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.b }}>
      <div style={{ background: "rgba(15,23,42,0.9)", border: "1px solid rgba(100,220,220,0.12)", borderRadius: 20, padding: "40px 36px", width: 400, textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
        <h2 style={{ fontSize: 22, color: "#fff", margin: "0 0 12px", fontFamily: F.d }}>Cuenta pendiente</h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.7, margin: "0 0 24px" }}>Su cuenta de médico está pendiente de aprobación por un administrador. Recibirá un correo cuando sea habilitada.</p>
        <p style={{ color: "#475569", fontSize: 12, margin: "0 0 20px" }}>Registrado como: {userProfile.email}</p>
        <button onClick={handleLogout} style={{ padding: "10px 24px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.4)", fontSize: 13, cursor: "pointer", fontFamily: F.b }}>Cerrar sesión</button>
      </div>
    </div>;
  }

  // Patient portal
  if (portal === "patient") return <div>
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(250,248,245,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e8e2d9", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 22px" }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: P.ac, fontFamily: F.b }}>Linfedema — Portal Pacientes</span>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ fontSize: 12, color: P.txM, fontFamily: F.b }}>Hola, {userProfile.name?.split(" ")[0]}</span>
        {userProfile.role === "doctor" && <button onClick={() => setPortal("doctor")} style={{ background: "none", border: "1px solid #e8e2d9", borderRadius: 6, color: P.txM, fontSize: 11, cursor: "pointer", padding: "4px 10px", fontFamily: F.b }}>Portal médico</button>}
        <button onClick={handleLogout} style={{ background: "none", border: "1px solid #e8e2d9", borderRadius: 6, color: P.txM, fontSize: 11, cursor: "pointer", padding: "4px 10px", fontFamily: F.b }}>Salir</button>
      </div>
    </div>
    <div style={{ paddingTop: 44 }}><PatientPortal user={userProfile} /></div>
  </div>;

  // Doctor portal
  if (portal === "doctor") return <div>
    <div style={{ position: "fixed", top: 0, left: 190, right: 0, zIndex: 100, background: "rgba(2,6,23,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${D.bdr}`, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 22px" }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: D.ac, fontFamily: F.b }}>Protocolo Linfedema — Portal Médico</span>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "#475569", fontFamily: F.b }}>{userProfile.name?.split(" ")[0]}</span>
        <button onClick={() => setPortal("patient")} style={{ background: "none", border: `1px solid ${D.bdr}`, borderRadius: 6, color: "#64748b", fontSize: 11, cursor: "pointer", padding: "4px 10px", fontFamily: F.b }}>Portal paciente</button>
        <button onClick={handleLogout} style={{ background: "none", border: `1px solid ${D.bdr}`, borderRadius: 6, color: "#64748b", fontSize: 11, cursor: "pointer", padding: "4px 10px", fontFamily: F.b }}>Salir</button>
      </div>
    </div>
    <div style={{ paddingTop: 40 }}><DoctorPortal user={userProfile} /></div>
  </div>;

  // Portal selection
  return <div style={{ minHeight: "100vh", background: "#0c1117", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.b, position: "relative", overflow: "hidden" }}>
    <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Source+Sans+3:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;700;800&display=swap" rel="stylesheet" />
    <div style={{ position: "absolute", top: "20%", left: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(26,122,109,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
    <div style={{ textAlign: "center", maxWidth: 680, padding: 36 }}>
      <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", fontWeight: 700, margin: "0 0 14px", fontFamily: F.m }}>DR. DAVID DUQUE · PROGRAMA DE LINFEDEMA</p>
      <h1 style={{ fontSize: 40, color: "#fff", margin: "0 0 10px", fontFamily: F.d, lineHeight: 1.2 }}>Programa de<br /><span style={{ color: D.ac }}>Linfedema</span></h1>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", margin: "0 0 28px", lineHeight: 1.7 }}>Manejo integral con protocolo de linfangiorresonancia magnética y ruta conservador–quirúrgica</p>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: "0 0 32px" }}>Bienvenido/a, {userProfile.name}</p>
      <div style={{ display: "grid", gridTemplateColumns: userProfile.role === "doctor" ? "1fr 1fr" : "1fr", gap: 18, maxWidth: userProfile.role === "doctor" ? 560 : 320, margin: "0 auto" }}>
        <div onClick={() => setPortal("patient")} style={{ background: "linear-gradient(135deg,rgba(26,122,109,0.15) 0%,rgba(26,122,109,0.05) 100%)", border: "1px solid rgba(26,122,109,0.3)", borderRadius: 20, padding: "36px 26px", cursor: "pointer", transition: "all 0.3s" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "#1a7a6d"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "rgba(26,122,109,0.3)"; }}>
          <div style={{ fontSize: 44, marginBottom: 14 }}>🫂</div>
          <h2 style={{ fontSize: 20, color: "#fff", margin: "0 0 8px", fontFamily: F.d }}>Portal Pacientes</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>Educación, autocuidado, blog, bienestar emocional y calidad de vida</p>
        </div>
        {userProfile.role === "doctor" && <div onClick={() => setPortal("doctor")} style={{ background: "linear-gradient(135deg,rgba(45,212,191,0.1) 0%,rgba(45,212,191,0.03) 100%)", border: "1px solid rgba(45,212,191,0.25)", borderRadius: 20, padding: "36px 26px", cursor: "pointer", transition: "all 0.3s" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = D.ac; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "rgba(45,212,191,0.25)"; }}>
          <div style={{ fontSize: 44, marginBottom: 14 }}>⚕️</div>
          <h2 style={{ fontSize: 20, color: "#fff", margin: "0 0 8px", fontFamily: F.d }}>Portal Médico</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>Protocolo completo: ISL, TDC, LYMQOL, MRL, N-LVA 2024, LYMPHA, admin</p>
        </div>}
      </div>
      <button onClick={handleLogout} style={{ marginTop: 28, background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "rgba(255,255,255,0.3)", fontSize: 12, cursor: "pointer", padding: "7px 16px", fontFamily: F.b }}>Cerrar sesión</button>
      <p style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", marginTop: 20 }}>Protocolo basado en evidencia · v5.0 · Firebase Auth + 2FA · 2024-2025</p>
    </div>
  </div>;
}
