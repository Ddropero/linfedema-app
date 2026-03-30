import { useState } from "react";
import { DC, Bdg } from "../shared";

export default function DFU() {
  const [ac, setAc] = useState(null);
  const ctrls = [["s1","Sem 1","#dc2626",["Heridas","Vendaje inel\u00e1stico","Circometr\u00eda basal"]],["s2","Sem 2","#ea580c",["Cicatrizaci\u00f3n","Ajuste compresi\u00f3n"]],["m1","Mes 1","#ca8a04",["Reinicio TDC","Circometr\u00eda","VAS"]],["m3","Mes 3","#0d9488",["Circometr\u00eda+UEL/LEL+LYMQOL","Comparar basal"]],["m8","Mes 8","#0284c7",["Evaluaci\u00f3n respuesta","Fotodocumentaci\u00f3n"]],["m12","Mes 12","#8b5cf6",["Todo + Lymph-ICF","Decisi\u00f3n largo plazo","MRL a 12m si reintervenci\u00f3n"]]];
  return <div>
    <DC title="Timeline Posoperatorio">
      <div style={{ position: "relative", paddingLeft: 20 }}>
        <div style={{ position: "absolute", left: 8, top: 0, bottom: 0, width: 2, background: "rgba(100,116,139,0.15)" }} />
        {ctrls.map(([id, time, color, items]) => <div key={id} onClick={() => setAc(ac===id?null:id)} style={{ position: "relative", marginBottom: 12, cursor: "pointer" }}>
          <div style={{ position: "absolute", left: -16, top: 5, width: 12, height: 12, borderRadius: "50%", background: color, border: "2px solid rgba(15,23,42,0.8)", zIndex: 1 }} />
          <div style={{ padding: "10px 14px", borderRadius: 8, background: ac===id?`${color}10`:"rgba(30,41,59,0.4)", border: `1px solid ${ac===id?`${color}44`:"rgba(100,116,139,0.08)"}`, marginLeft: 6 }}>
            <div style={{ fontWeight: 700, color, fontSize: 13, marginBottom: ac===id?6:0 }}>{time}</div>
            {ac===id && items.map((it, i) => <div key={i} style={{ display: "flex", gap: 6, marginBottom: 2 }}><span style={{ color, fontSize: 7, marginTop: 5 }}>{"\u25cf"}</span><span style={{ color: "#cbd5e1", fontSize: 12 }}>{it}</span></div>)}
          </div>
        </div>)}
      </div>
    </DC>
    <DC title="Compresi\u00f3n Posoperatoria">{[["0-3m: Vendaje 24h/d\u00eda","#dc2626"],["3-6m: Compresi\u00f3n 12h/d\u00eda","#ca8a04"],[">6m: Seg\u00fan necesidad","#16a34a"]].map(([t,c], i) => <div key={i} style={{ padding: "8px 12px", borderRadius: 7, marginBottom: 6, background: "rgba(30,41,59,0.4)", borderLeft: `3px solid ${c}` }}><span style={{ color: "#e2e8f0", fontSize: 12.5 }}>{t}</span></div>)}</DC>
    <DC title="Decisi\u00f3n 12 Meses">{[{ l: "Buena respuesta", d: "Sostenida", a: "Continuar TDC + compresi\u00f3n", c: "#16a34a" },{ l: "Adiposo residual", d: "Sin f\u00f3vea", a: "Liposucci\u00f3n subunidad", c: "#8b5cf6" },{ l: "Parcial", d: "Vasos residuales", a: "Nueva MRL \u2192 ALV/TLV", c: "#ca8a04" },{ l: "Progresi\u00f3n", d: "Fibrosis", a: "Charles modificada", c: "#dc2626" }].map((o, i) => <div key={i} style={{ padding: "12px 14px", borderRadius: 8, marginBottom: 8, background: "rgba(30,41,59,0.4)", border: `1px solid ${o.c}22` }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}><span style={{ color: o.c, fontWeight: 700, fontSize: 13 }}>{o.l}</span><Bdg t={o.d} c={o.c} /></div><p style={{ color: "#94a3b8", fontSize: 12, margin: "4px 0 0" }}>{"\u2192"} {o.a}</p></div>)}</DC>
  </div>;
}
