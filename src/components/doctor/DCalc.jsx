import { useState } from "react";
import { F } from "../../styles/palette";
import { DC, NI } from "../shared";

export default function DCalc() {
  const [limb, setLimb] = useState("upper");
  const [imc, setImc] = useState(25);
  const [affC, setAffC] = useState([0,0,0,0,0]);
  const [conC, setConC] = useState([0,0,0,0,0]);
  const uL = ["Mu\u00f1eca","Antebrazo","Brazo dist.","Brazo prox."];
  const lL = ["Tobillo","Pantorrilla","Rodilla","Muslo dist.","Muslo prox."];
  const labels = limb === "upper" ? uL : lL;
  const cV = cs => { let v = 0; for (let i = 0; i < cs.length - 1; i++) { const c1 = cs[i], c2 = cs[i+1]; if (c1 > 0 && c2 > 0) { const r1 = c1/(2*Math.PI), r2 = c2/(2*Math.PI); v += (Math.PI*10*(r1*r1+r1*r2+r2*r2))/3; }} return v; };
  const aV = cV(affC), cVo = cV(conC), idx = imc > 0 ? (aV/imc).toFixed(1) : 0, cIdx = imc > 0 ? (cVo/imc).toFixed(1) : 0, dP = cVo > 0 ? (((aV-cVo)/cVo)*100).toFixed(1) : 0;

  return <div>
    <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>{["upper","lower"].map(l => <button key={l} onClick={() => { setLimb(l); setAffC(l==="upper"?[0,0,0,0]:[0,0,0,0,0]); setConC(l==="upper"?[0,0,0,0]:[0,0,0,0,0]); }} style={{ padding: "6px 14px", borderRadius: 7, border: `1px solid ${limb===l?"#0284c7":"rgba(100,116,139,0.15)"}`, background: limb===l?"rgba(2,132,199,0.1)":"transparent", color: limb===l?"#0284c7":"#64748b", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>{l==="upper"?"UEL":"LEL"}</button>)}</div>
    <DC><NI label="IMC" value={imc} onChange={setImc} unit="kg/m\u00b2" min={10} max={60} /></DC>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
      <DC title="Afectado" accent="#dc2626">{labels.map((l, i) => <NI key={`a${i}`} label={l} value={affC[i]} onChange={v => { const n=[...affC]; n[i]=v; setAffC(n); }} unit="cm" min={0} max={200} />)}</DC>
      <DC title="Contralateral" accent="#16a34a">{labels.map((l, i) => <NI key={`c${i}`} label={l} value={conC[i]} onChange={v => { const n=[...conC]; n[i]=v; setConC(n); }} unit="cm" min={0} max={200} />)}</DC>
    </div>
    <DC title="Resultados">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>{[{ l: "Afectado", v: idx, c: "#dc2626" },{ l: "Sano", v: cIdx, c: "#16a34a" },{ l: "Dif.Vol.", v: `${dP}%`, c: Math.abs(dP)>=20?"#dc2626":Math.abs(dP)>=10?"#ca8a04":"#16a34a" }].map((r, i) => <div key={i} style={{ textAlign: "center", padding: 12, background: "rgba(30,41,59,0.5)", borderRadius: 10 }}><div style={{ fontSize: 22, fontWeight: 800, color: r.c, fontFamily: F.m }}>{r.v}</div><div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>{r.l}</div></div>)}</div>
    </DC>
  </div>;
}
