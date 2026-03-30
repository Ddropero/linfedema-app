import { F, P } from "../../styles/palette";
import { PC, PBack } from "../shared";

export default function PAlarm({ nav }) { return <div><PBack nav={nav} /><h2 style={{ fontSize: 24, color: P.tx, margin: "0 0 22px", fontFamily: F.d }}>¿Cuándo Consultar?</h2>
  <div style={{ background: "#fef2f2", border: "2px solid #fecaca", borderRadius: 16, padding: 26, marginBottom: 20 }}>
    <h3 style={{ margin: "0 0 12px", color: "#991b1b", fontSize: 17, fontFamily: F.b }}>🚨 Acuda a URGENCIAS:</h3>
    {["Enrojecimiento súbito y extenso","Fiebre ≥ 38°C","Rayas rojas que se extienden","Dolor intenso de aparición rápida","Calor local con hinchazón rápida","Heridas que no cicatrizan o supuran"].map((s, i) => <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}><span style={{ color: "#dc2626", fontWeight: 800, fontSize: 13 }}>!</span><p style={{ margin: 0, color: "#7f1d1d", fontSize: 14 }}>{s}</p></div>)}
  </div>
  <PC><h3 style={{ margin: "0 0 12px", color: "#b45309", fontSize: 15, fontFamily: F.b }}>⚠️ Consulte con su médico:</h3>
    {["Aumento progresivo de hinchazón pese a tratamiento","Prenda compresiva ya no queda bien","Dolor persistente","Cambios cutáneos: endurecimiento, verrugas, ampollas","Más de 2 celulitis en un año","Dificultad creciente para actividades diarias"].map((s, i) => <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}><div style={{ width: 5, height: 5, borderRadius: "50%", background: "#ea580c", marginTop: 7, flexShrink: 0 }} /><p style={{ margin: 0, color: P.tx, fontSize: 14 }}>{s}</p></div>)}
  </PC></div>; }
