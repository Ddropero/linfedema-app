import { useState } from "react";
import { F } from "../../styles/palette";
import { DC, Bdg } from "../shared";
import { ISL } from "../../data/islStages";

export default function DISL() {
  const [sel, setSel] = useState(null);
  return <div>
    {ISL.map((s, i) => <div key={i} onClick={() => setSel(i)} style={{ background: sel === i ? `${s.c}12` : "rgba(15,23,42,0.65)", border: `2px solid ${sel === i ? s.c : "rgba(100,116,139,0.12)"}`, borderRadius: 12, padding: "14px 16px", marginBottom: 10, cursor: "pointer" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}><div style={{ width: 10, height: 10, borderRadius: "50%", background: s.c }} /><span style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 14, fontFamily: F.b }}>{s.s}</span><Bdg t={s.n} c={s.c} /></div>
      <p style={{ color: "#94a3b8", fontSize: 12.5, margin: "0 0 3px" }}>{s.desc}</p>
      <p style={{ color: s.c, fontSize: 12, margin: 0, fontWeight: 600 }}>{"\u2192"} {s.tx}</p>
    </div>)}
    <DC title="Severidad Volum\u00e9trica">{[["Leve: < 20%","#16a34a"],["Moderado: 20\u201340%","#ca8a04"],["Severo: > 40%","#dc2626"]].map(([l,c], i) => <div key={i} style={{ padding: "10px 14px", borderRadius: 8, marginBottom: 6, background: "rgba(30,41,59,0.4)", borderLeft: `3px solid ${c}`, color: "#e2e8f0", fontSize: 13 }}>{l}</div>)}</DC>
  </div>;
}
