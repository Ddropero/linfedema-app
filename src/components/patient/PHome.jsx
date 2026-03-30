import { F, P } from "../../styles/palette";

export default function PHome({ nav }) {
  return <div>
    <div style={{ background: "linear-gradient(135deg,#1a7a6d 0%,#0f5a50 50%,#134e4a 100%)", borderRadius: 24, padding: "52px 36px", marginBottom: 28, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
      <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", fontWeight: 700, margin: "0 0 10px", fontFamily: F.m }}>DR. DAVID DUQUE — LINFEDEMA</p>
      <h1 style={{ fontSize: 32, color: "#fff", margin: "0 0 10px", fontFamily: F.d, lineHeight: 1.3 }}>Programa de Linfedema</h1>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", margin: "0 0 24px", maxWidth: 500, lineHeight: 1.7, fontFamily: F.b }}>Información, herramientas y acompañamiento para manejar su linfedema con confianza.</p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button onClick={() => nav("edu")} style={{ padding: "11px 22px", borderRadius: 10, border: "2px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: F.b }}>Entender mi condición</button>
        <button onClick={() => nav("selfcare")} style={{ padding: "11px 22px", borderRadius: 10, border: "none", background: "#fff", color: "#1a7a6d", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: F.b }}>Guía de autocuidado</button>
      </div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 28 }}>
      {[{ i: "📖", t: "¿Qué es el linfedema?", s: "Entienda su condición", to: "edu" },{ i: "🧴", t: "Autocuidado", s: "Cuidados diarios", to: "selfcare" },{ i: "💚", t: "Bienestar emocional", s: "Apoyo psicosocial", to: "emotional" },{ i: "❤️", t: "Calidad de vida", s: "Cuestionario LYMQOL", to: "qol" },{ i: "❓", t: "Preguntas frecuentes", s: "Respuestas claras", to: "faq" },{ i: "🚨", t: "Señales de alarma", s: "Cuándo consultar", to: "alarm" },{ i: "📊", t: "Estadios ISL", s: "Clasificación", to: "stages" },{ i: "🔬", t: "Cirugía", s: "Opciones quirúrgicas", to: "surgery" },{ i: "🏋️", t: "Ejercicio seguro", s: "Evidencia y guías", to: "exercise" },{ i: "📰", t: "Blog", s: "Artículos y noticias", to: "blog" }].map((x, i) => (
        <div key={i} onClick={() => nav(x.to)} style={{ background: "#fff", border: "1px solid #e8e2d9", borderRadius: 14, padding: 20, cursor: "pointer", transition: "all 0.2s", boxShadow: "0 1px 8px rgba(44,36,24,0.03)" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(44,36,24,0.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 8px rgba(44,36,24,0.03)"; }}>
          <span style={{ fontSize: 26 }}>{x.i}</span>
          <h3 style={{ margin: "8px 0 3px", fontSize: 14, fontWeight: 700, color: P.tx, fontFamily: F.b }}>{x.t}</h3>
          <p style={{ margin: 0, fontSize: 12, color: P.txM }}>{x.s}</p>
        </div>
      ))}
    </div>
    <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 14, padding: "18px 22px", display: "flex", gap: 12, alignItems: "flex-start" }}>
      <span style={{ fontSize: 22 }}>🚨</span>
      <div><h4 style={{ margin: "0 0 3px", color: "#991b1b", fontSize: 13, fontFamily: F.b }}>Señales de alarma — Acuda a urgencias si presenta:</h4><p style={{ margin: 0, color: "#7f1d1d", fontSize: 13, lineHeight: 1.6 }}>Enrojecimiento súbito, calor, fiebre, rayas rojas en la piel o dolor intenso en el miembro afectado.</p></div>
    </div>
  </div>;
}
