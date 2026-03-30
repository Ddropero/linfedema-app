import { useState } from "react";
import { D } from "../../styles/palette";
import { DC, DCk } from "../shared";

export default function DTDC() {
  const [c, setC] = useState({});
  const t = k => setC(p => ({...p,[k]:!p[k]}));
  const resp = [["r1","Reducci\u00f3n circunferencia \u2265 10%"],["r2","Reducci\u00f3n/estabilizaci\u00f3n UEL/LEL"],["r3","Mejor\u00eda significativa LYMQOL/Lymph-ICF"],["r4","Control infecciones"],["r5","Autocuidado sin deterioro"]];
  const rc = resp.filter(([k]) => c[k]).length;
  return <div>
    <DC title="Fase 1 \u2014 Reductiva (3-8 sem)" accent={D.ac}>
      <div style={{ background: "rgba(45,212,191,0.06)", borderRadius: 8, padding: 12, marginBottom: 12, border: "1px solid rgba(45,212,191,0.15)" }}><p style={{ color: D.ac, fontSize: 13, margin: 0, fontWeight: 600 }}>Meta: reducci\u00f3n 40-60%. Sesiones 3-5/semana.</p></div>
      {[["dlm","DLM (Vodder, 3-5/sem)"],["ban","Vendaje multicapa"],["pre","Presoterapia neum\u00e1tica"],["exe","Ejercicios supervisados"],["ski","Cuidado piel / educaci\u00f3n"]].map(([k,l]) => <DCk key={k} label={l} checked={!!c[k]} onChange={() => t(k)} />)}
    </DC>
    <DC title="Criterios Respuesta (3 meses)">
      {resp.map(([k,l]) => <DCk key={k} label={l} checked={!!c[k]} onChange={() => t(k)} />)}
      <div style={{ marginTop: 10, padding: 10, borderRadius: 7, background: rc >= 4 ? "rgba(22,163,74,0.08)" : rc >= 2 ? "rgba(202,138,4,0.08)" : "rgba(220,38,38,0.08)" }}>
        <p style={{ color: rc >= 4 ? "#16a34a" : rc >= 2 ? "#ca8a04" : "#dc2626", margin: 0, fontWeight: 700, fontSize: 13 }}>{rc >= 4 ? "\u2713 Adecuada \u2192 Conservador" : rc >= 2 ? "\u26a0 Parcial \u2192 Evaluar transici\u00f3n" : "\u2717 Insuficiente \u2192 Cirug\u00eda"}</p>
      </div>
    </DC>
  </div>;
}
