import { useState, useMemo } from "react";
import { F, P } from "../../styles/palette";
import { Bdg, PC, PBack, Gauge, getSev } from "../shared";
import { LQ_ARM, LQ_LEG } from "../../data/lymqolData";

export default function PQOL({ nav }) {
  const [limb, setLimb] = useState("arm");
  const [ans, setAns] = useState({});
  const [aDom, setADom] = useState(null);
  const doms = limb === "arm" ? LQ_ARM : LQ_LEG;
  const scores = useMemo(() => { const sc = {}; let ts = 0, tc = 0; Object.entries(doms).forEach(([dk, dom]) => { const v = dom.q.map((_, i) => ans[`${dk}_${i}`]).filter(Boolean); if (v.length) { sc[dk] = { avg: v.reduce((a, b) => a + b, 0) / v.length, ct: v.length, tot: dom.q.length }; ts += v.reduce((a, b) => a + b, 0); tc += v.length; } }); sc._ov = tc > 0 ? ts / tc : 0; sc._a = tc; sc._t = Object.values(doms).reduce((a, d) => a + d.q.length, 0); return sc; }, [ans, doms]);

  return <div><PBack nav={nav} />
    <h2 style={{ fontSize: 24, color: P.tx, margin: "0 0 6px", fontFamily: F.d }}>Evalúe su Calidad de Vida</h2>
    <p style={{ color: P.txM, fontSize: 14, margin: "0 0 22px" }}>Cuestionario LYMQOL — Comparta los resultados con su equipo médico</p>
    <PC><p style={{ color: P.txM, fontSize: 13, margin: "0 0 10px" }}>¿Cuál es el miembro afectado?</p>
      <div style={{ display: "flex", gap: 8 }}>
        {[{ k: "arm", l: "Brazo 🤚" },{ k: "leg", l: "Pierna 🦵" }].map(x => <button key={x.k} onClick={() => { setLimb(x.k); setAns({}); setADom(null); }} style={{ flex: 1, padding: 12, borderRadius: 10, border: `2px solid ${limb === x.k ? P.ac : "#e8e2d9"}`, background: limb === x.k ? P.acL : "#fff", color: limb === x.k ? P.ac : P.txM, fontSize: 14, cursor: "pointer", fontWeight: 600, fontFamily: F.b }}>{x.l}</button>)}
      </div>
    </PC>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
      {Object.entries(doms).map(([dk, dom]) => { const sc = scores[dk], isA = aDom === dk, sv = sc ? getSev(sc.avg, 4) : null; return (
        <div key={dk} onClick={() => setADom(isA ? null : dk)} style={{ background: "#fff", border: `2px solid ${isA ? dom.c : "#e8e2d9"}`, borderRadius: 14, padding: 16, cursor: "pointer" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 20 }}>{dom.i}</span>{sc && <Bdg t={sc.avg.toFixed(1)+"/4"} c={sv.c} />}</div>
          <h4 style={{ margin: "6px 0 3px", color: P.tx, fontSize: 13, fontFamily: F.b }}>{dom.l}</h4>
          <p style={{ margin: 0, color: P.txM, fontSize: 11.5 }}>{sc ? `${sc.ct}/${sc.tot}` : `${dom.q.length} preguntas`}</p>
          {sc && <p style={{ margin: "3px 0 0", color: sv.c, fontSize: 11, fontWeight: 600 }}>{sv.t}</p>}
        </div>); })}
    </div>
    {aDom && doms[aDom] && <PC style={{ borderLeft: `4px solid ${doms[aDom].c}` }}>
      <h3 style={{ margin: "0 0 8px", color: P.tx, fontSize: 15, fontFamily: F.b }}>{doms[aDom].i} {doms[aDom].l}</h3>
      <p style={{ color: P.txM, fontSize: 12, margin: "0 0 8px" }}>1 = Nada · 2 = Un poco · 3 = Bastante · 4 = Mucho</p>
      {doms[aDom].q.map((q, i) => <div key={i} style={{ padding: "8px 0", borderBottom: "1px solid #f1ede7" }}>
        <p style={{ color: P.tx, fontSize: 14, margin: "0 0 6px" }}><span style={{ color: P.txM, fontSize: 11, marginRight: 5 }}>{i+1}.</span>{q}</p>
        <div style={{ display: "flex", gap: 5 }}>{["Nada","Un poco","Bastante","Mucho"].map((l, j) => { const v = j+1, a = ans[`${aDom}_${i}`] === v; const cs = ["#16a34a","#ca8a04","#ea580c","#dc2626"]; return <button key={v} onClick={() => setAns(p => ({...p,[`${aDom}_${i}`]:v}))} style={{ flex: 1, padding: "7px 2px", borderRadius: 7, border: `2px solid ${a ? cs[j] : "#e8e2d9"}`, background: a ? `${cs[j]}10` : "#fff", color: a ? cs[j] : P.txM, fontSize: 11.5, fontWeight: a ? 700 : 500, cursor: "pointer", fontFamily: F.b }}><div style={{ fontSize: 14, fontWeight: 800 }}>{v}</div>{l}</button>; })}</div>
      </div>)}
    </PC>}
    {scores._a > 0 && <PC style={{ borderTop: `4px solid ${P.ac}` }}>
      <h3 style={{ margin: "0 0 14px", color: P.tx, fontSize: 16, fontFamily: F.b }}>📊 Sus Resultados</h3>
      <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>{Object.entries(doms).map(([dk, dom]) => { const sc = scores[dk]; return sc ? <Gauge key={dk} v={sc.avg} max={4} label={dom.l} color={dom.c} /> : null; })}</div>
      <div style={{ textAlign: "center", padding: 18, background: "#faf8f5", borderRadius: 12 }}>
        <p style={{ margin: "0 0 3px", color: P.txM, fontSize: 12 }}>Promedio global</p>
        <div style={{ fontSize: 34, fontWeight: 800, color: getSev(scores._ov, 4).c, fontFamily: F.m }}>{scores._ov.toFixed(1)}<span style={{ fontSize: 15, color: P.txM }}> / 4</span></div>
        <p style={{ margin: "5px 0 0", color: getSev(scores._ov, 4).c, fontWeight: 600, fontSize: 14 }}>{getSev(scores._ov, 4).t}</p>
      </div>
      <div style={{ marginTop: 12, background: P.acL, borderRadius: 10, padding: 12 }}><p style={{ margin: 0, color: P.ac, fontSize: 13, lineHeight: 1.6 }}>📌 Comparta estos resultados en su próximo control. Menor puntaje = mejor calidad de vida.</p></div>
    </PC>}
  </div>;
}
