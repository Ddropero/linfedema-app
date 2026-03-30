import { F, P } from "../../styles/palette";
import { PC, PBack } from "../shared";
import { EMOTIONAL } from "../../data/selfcareData";

export default function PEmotional({ nav }) {
  return <div><PBack nav={nav} />
    <h2 style={{ fontSize: 24, color: P.tx, margin: "0 0 6px", fontFamily: F.d }}>Bienestar Emocional</h2>
    <p style={{ color: P.txM, fontSize: 14, margin: "0 0 22px" }}>El linfedema no solo afecta su cuerpo — también su bienestar emocional</p>
    <div style={{ background: "#f0fdf4", borderRadius: 14, padding: "18px 22px", marginBottom: 20, border: "1px solid #bbf7d0" }}>
      <p style={{ margin: 0, color: "#166534", fontSize: 14, lineHeight: 1.7 }}>💚 Estudios con seguimiento de hasta 10 años muestran que el linfedema impacta la salud mental, el funcionamiento social y la imagen corporal de forma significativa. Reconocer esto es el primer paso para sentirse mejor.</p>
    </div>
    {EMOTIONAL.map((e, i) => (
      <PC key={i} style={{ borderLeft: "4px solid #0d9488" }}>
        <h3 style={{ margin: "0 0 8px", color: P.tx, fontSize: 16, fontFamily: F.b }}>{e.t}</h3>
        <p style={{ margin: 0, color: P.tx, fontSize: 14, lineHeight: 1.8 }}>{e.desc}</p>
      </PC>
    ))}
    <PC style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}>
      <h3 style={{ margin: "0 0 8px", color: "#1e40af", fontSize: 16, fontFamily: F.b }}>Recursos de apoyo</h3>
      <p style={{ margin: 0, color: "#1d4ed8", fontSize: 14, lineHeight: 1.8 }}>El equipo de linfedema del Dr. David Duque incluye psicología y trabajo social. No dude en solicitar una consulta con estos profesionales. Recuerde: cuidar su mente es parte del tratamiento.</p>
    </PC>
  </div>;
}
