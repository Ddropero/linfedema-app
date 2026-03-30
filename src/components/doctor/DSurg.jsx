import { useState } from "react";
import { F } from "../../styles/palette";
import { DC, DCk } from "../shared";

export default function DSurg() {
  const [sp, setSp] = useState(null);
  const [pc, setPc] = useState({});
  const t = k => setPc(p => ({...p,[k]:!p[k]}));
  return <div>
    <DC title="Procedimientos \u2014 Evidencia 2024-2025">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[{ id: "alv", n: "ALV", c: "#0d9488", d: "ISL I-II con vasos funcionales. \u00c9xito >90% (MRL+ICG). N-LVA RCT 2024: mejora Lymph-ICF, 42% suspende compresi\u00f3n. Reducci\u00f3n 30-35%, ~2 celulitis/a\u00f1o menos.", sub: "Sutura 11-0/12-0. Candidato ideal: temprano, vasos permeables por MRL." },
          { id: "tlv", n: "TLV", c: "#0284c7", d: "Avanzados o sin vasos. Respuesta m\u00e1s lenta pero m\u00e1s duradera que ALV. Donantes: inguinal, supraclavicular, submental.", sub: "Riesgo de linfedema en sitio donante." },
          { id: "lipo", n: "Liposucci\u00f3n", c: "#8b5cf6", d: "Componente graso, sin f\u00f3vea. Compresi\u00f3n de por vida. Mejor resultado en MRL estadio 3 (Seoul National University).", sub: "No curativa. Puede combinarse con ALV." },
          { id: "cha", n: "Charles", c: "#dc2626", d: "Estadio III, fibrosis severa. \u00daltima opci\u00f3n. Peores resultados cosm\u00e9ticos.", sub: "Procedimiento reductor de volumen." },
          { id: "lym", n: "LYMPHA", c: "#6366f1", d: "Preventiva durante ALND. Boccardo: 4.05% incidencia vs 13-65%. Levy 2024: resultados a 4 a\u00f1os.", sub: "Requiere microscopio quir\u00fargico. Coordinaci\u00f3n cirujano oncol\u00f3gico + pl\u00e1stico." }].map(p => (
          <div key={p.id} onClick={() => setSp(sp===p.id?null:p.id)} style={{ padding: 14, borderRadius: 10, background: sp===p.id?`${p.c}12`:"rgba(30,41,59,0.5)", border: `2px solid ${sp===p.id?p.c:"rgba(100,116,139,0.1)"}`, cursor: "pointer" }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: p.c, fontFamily: F.m }}>{p.n}</div>
            <p style={{ fontSize: 12, color: "#94a3b8", margin: "4px 0 0", lineHeight: 1.5 }}>{p.d}</p>
            {sp===p.id && <p style={{ fontSize: 11.5, color: p.c, margin: "6px 0 0", fontWeight: 600 }}>{p.sub}</p>}
          </div>
        ))}
      </div>
    </DC>
    <DC title="Selecci\u00f3n quir\u00fargica por MRL (Seoul Nat. Univ.)" accent="#8b5cf6">
      {[["MRL Estadio 1","LVA sola \u2014 mayor reducci\u00f3n volum\u00e9trica en estos pacientes","#16a34a"],["MRL Estadio 2","LVA sola \u2014 mejores resultados volum\u00e9tricos y satisfacci\u00f3n","#ca8a04"],["MRL Estadio 3","LVA + Liposucci\u00f3n \u2014 reducci\u00f3n significativa y alta satisfacci\u00f3n","#ea580c"],["Severidad alta (BIA)","LVA + TLV \u2014 mayor reducci\u00f3n fluido corporal por BIA","#dc2626"]].map(([s,d,c], i) => <div key={i} style={{ padding: "10px 14px", borderRadius: 8, marginBottom: 6, background: "rgba(30,41,59,0.4)", borderLeft: `3px solid ${c}` }}><span style={{ color: c, fontWeight: 700, fontSize: 12.5 }}>{s}: </span><span style={{ color: "#cbd5e1", fontSize: 12.5 }}>{d}</span></div>)}
    </DC>
    <DC title="Protocolo MRL Preoperatorio" accent="#0284c7">
      <ol style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.8, margin: 0, paddingLeft: 18 }}><li>MRL con gadolinio a Radiolog\u00eda</li><li>Discusi\u00f3n conjunta Cirug\u00eda Pl\u00e1stica + Radiolog\u00eda</li><li>Mapear vasos funcionales, obstrucciones, venas</li><li>Definir sitios de incisi\u00f3n y anastomosis</li><li>Correlacionar con ICG intraoperatoria (\u00e9xito &gt;90%)</li></ol>
      <div style={{ marginTop: 10, padding: 10, borderRadius: 7, background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.12)" }}><p style={{ color: "#7dd3fc", fontSize: 12, margin: 0 }}>CE-MRL + ICG combinados detectan m\u00e1s vasos que ICG sola (estudio 2023-2024, 35 pacientes). MRL es GPS para la cirug\u00eda linf\u00e1tica.</p></div>
    </DC>
    <DC title="Tecnolog\u00eda emergente" accent="#6366f1">
      <p style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.7, margin: 0 }}>Cirug\u00eda rob\u00f3tica (sistema MUSA): primeros ensayos cl\u00ednicos en humanos para ALV. Promete mejorar la precisi\u00f3n en supermicrocirug\u00eda donde la destreza humana tiene limitaciones.</p>
    </DC>
    <DC title="Checklist Preoperatorio" accent="#ea580c">
      {[["a","TDC \u2265 3 meses (salvo urgencia)"],["b","IMC \u2264 35"],["c","HbA1c < 7.5% (diab\u00e9ticos)"],["d","Sin tabaco \u2265 4 semanas"],["e","Comorbilidades optimizadas"],["f","MRL interpretada"],["g","Plan quir\u00fargico definido"],["h","TDC preop \u2265 1 mes"],["i","Consentimiento informado"]].map(([k,l]) => <DCk key={k} label={l} checked={!!pc[k]} onChange={() => t(k)} />)}
      {Object.keys(pc).length === 9 && Object.values(pc).every(Boolean) && <div style={{ marginTop: 10, padding: 10, borderRadius: 7, background: "rgba(22,163,74,0.08)" }}><p style={{ color: "#16a34a", margin: 0, fontWeight: 700, fontSize: 12.5 }}>{"\u2713"} Paciente apto para cirug\u00eda</p></div>}
    </DC>
  </div>;
}
