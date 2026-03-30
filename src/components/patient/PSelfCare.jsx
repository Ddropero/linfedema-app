import { useState } from "react";
import { F, P } from "../../styles/palette";
import { PC, PBack } from "../shared";
import { SELFCARE } from "../../data/selfcareData";

export default function PSelfCare({ nav }) {
  const [op, setOp] = useState(null);
  return <div><PBack nav={nav} />
    <h2 style={{ fontSize: 24, color: P.tx, margin: "0 0 6px", fontFamily: F.d }}>Guía de Autocuidado</h2>
    <p style={{ color: P.txM, fontSize: 14, margin: "0 0 22px" }}>Cuidados diarios basados en evidencia para controlar su linfedema</p>
    {SELFCARE.map((sec, i) => (
      <PC key={i} style={{ cursor: "pointer", border: op === i ? `2px solid ${sec.c}` : "1px solid #e8e2d9" }}>
        <div onClick={() => setOp(op === i ? null : i)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}><span style={{ fontSize: 26 }}>{sec.i}</span><h3 style={{ margin: 0, fontSize: 16, color: P.tx, fontFamily: F.b }}>{sec.t}</h3></div>
          <span style={{ fontSize: 16, color: P.txM, transition: "transform 0.3s", transform: op === i ? "rotate(180deg)" : "" }}>▾</span>
        </div>
        {op === i && <div style={{ marginTop: 14 }}>{sec.tips.map((tip, j) => <div key={j} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}><div style={{ width: 6, height: 6, borderRadius: "50%", background: sec.c, marginTop: 7, flexShrink: 0 }} /><p style={{ margin: 0, color: P.tx, fontSize: 14, lineHeight: 1.7 }}>{tip}</p></div>)}</div>}
      </PC>
    ))}
  </div>;
}
