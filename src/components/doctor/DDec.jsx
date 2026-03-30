import { useState } from "react";
import { D } from "../../styles/palette";
import { DC, DCk } from "../shared";

export default function DDec() {
  const [sc, setSc] = useState(null);
  const [ec, setEc] = useState({});
  const t = k => setEc(p => ({...p,[k]:!p[k]}));
  return <div>
    <DC title="Evaluaci\u00f3n Obligatoria (3 meses)" accent="#0284c7">{[["e1","Circometr\u00eda + UEL/LEL comparativo"],["e2","LYMQOL + Lymph-ICF comparativo"],["e3","VAS dolor"],["e4","Reclasificaci\u00f3n ISL"],["e5","MRL (si indicaci\u00f3n quir\u00fargica)"],["e6","Fotodocumentaci\u00f3n"]].map(([k,l]) => <DCk key={k} label={l} checked={!!ec[k]} onChange={() => t(k)} />)}</DC>
    {[{ id: "A", t: "Continuar Conservador", c: "#16a34a", i: "\u2713", cr: ["Reducci\u00f3n \u2265 10%","Mejora LYMQOL/ICF","Control infecciones","Estabilidad ISL"] },
      { id: "B", t: "Evaluar Cirug\u00eda", c: "#ea580c", i: "\u26a0", cr: ["Reducci\u00f3n < 10%","Sin mejora LYMQOL","Infecciones \u2265 2/a\u00f1o","Progresi\u00f3n ISL","Dependencia compresi\u00f3n"] },
      { id: "C", t: "Urgencia Quir\u00fargica", c: "#dc2626", i: "\ud83d\udea8", cr: ["Estadio III severo","Infecciones \u2265 3-4/a\u00f1o","Sospecha linfangiosarcoma","Candidato LYMPHA preventivo"] }
    ].map(s => <div key={s.id} onClick={() => setSc(s.id)} style={{ background: sc===s.id?`${s.c}10`:D.card, border: `2px solid ${sc===s.id?s.c:"rgba(100,116,139,0.1)"}`, borderRadius: 12, padding: 16, marginBottom: 10, cursor: "pointer" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}><span>{s.i}</span><span style={{ fontWeight: 700, fontSize: 14, color: s.c }}>{s.id}: {s.t}</span></div>
      {s.cr.map((c, i) => <div key={i} style={{ display: "flex", gap: 6, marginBottom: 2 }}><span style={{ color: s.c, fontSize: 8, marginTop: 5 }}>{"\u25cf"}</span><span style={{ color: "#cbd5e1", fontSize: 12.5 }}>{c}</span></div>)}
    </div>)}
  </div>;
}
