import { useState } from "react";
import { F, D } from "../../styles/palette";
import DEval from "./DEval";
import DISL from "./DISL";
import DTDC from "./DTDC";
import DCalc from "./DCalc";
import DCVRS from "./DCVRS";
import DDec from "./DDec";
import DSurg from "./DSurg";
import DFU from "./DFU";
import DBlog from "./DBlog";

const DTABS = [
  { id: "eval", l: "Evaluaci\u00f3n", i: "\ud83d\udd0d" },
  { id: "isl", l: "ISL", i: "\ud83d\udcca" },
  { id: "tdc", l: "TDC", i: "\ud83d\udcaa" },
  { id: "calc", l: "UEL/LEL", i: "\ud83e\uddee" },
  { id: "cvrs", l: "CVRS", i: "\u2764\ufe0f" },
  { id: "dec", l: "Decisi\u00f3n 3m", i: "\u2696\ufe0f" },
  { id: "surg", l: "Cirug\u00eda", i: "\ud83d\udd2c" },
  { id: "fu", l: "Seguimiento", i: "\ud83d\udccb" },
  { id: "blog", l: "Blog", i: "\u270d\ufe0f" },
];

export default function DoctorPortal({ user }) {
  const [tab, setTab] = useState("eval");
  const tabs = {
    eval: <DEval />,
    isl: <DISL />,
    tdc: <DTDC />,
    calc: <DCalc />,
    cvrs: <DCVRS />,
    dec: <DDec />,
    surg: <DSurg />,
    fu: <DFU />,
    blog: <DBlog user={user} />,
  };
  return <div style={{ minHeight: "100vh", background: D.bg, color: D.tx, fontFamily: F.b, display: "flex" }}>
    <div style={{ width: 190, minHeight: "100vh", background: "rgba(2,6,23,0.95)", borderRight: `1px solid ${D.bdr}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "20px 14px 16px", borderBottom: `1px solid ${D.bdr}` }}>
        <div style={{ fontSize: 9, letterSpacing: "0.12em", color: "#475569", fontWeight: 700, fontFamily: F.m }}>DR. DAVID DUQUE</div>
        <h2 style={{ margin: "5px 0 0", fontSize: 14, fontWeight: 700, color: D.ac, fontFamily: F.d }}>Protocolo Linfedema</h2>
        <p style={{ margin: "2px 0 0", fontSize: 10, color: "#475569" }}>v4.0 {"\u2014"} Evidencia 2024-2025</p>
      </div>
      <nav style={{ flex: 1, padding: "8px 5px" }}>{DTABS.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ display: "flex", alignItems: "center", gap: 7, width: "100%", padding: "8px 9px", borderRadius: 7, border: "none", background: tab===t.id?"rgba(45,212,191,0.1)":"transparent", color: tab===t.id?D.ac:"#64748b", cursor: "pointer", fontSize: 12, fontWeight: tab===t.id?700:500, textAlign: "left", marginBottom: 1, fontFamily: F.b, borderLeft: tab===t.id?"3px solid "+D.ac:"3px solid transparent" }}><span style={{ fontSize: 13 }}>{t.i}</span><span>{t.l}</span></button>)}</nav>
    </div>
    <div style={{ flex: 1, padding: "26px 30px", maxWidth: 760, overflowY: "auto" }}>
      <h2 style={{ margin: "0 0 3px", fontSize: 19, color: "#e0f2fe", fontFamily: F.d }}>{DTABS.find(t => t.id===tab)?.l}</h2>
      <p style={{ color: "#475569", fontSize: 11.5, margin: "0 0 16px" }}>Portal M\u00e9dico {"\u2014"} Protocolo basado en evidencia</p>
      {tabs[tab]}
    </div>
  </div>;
}
