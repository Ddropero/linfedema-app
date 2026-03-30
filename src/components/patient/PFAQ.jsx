import { useState } from "react";
import { F, P } from "../../styles/palette";
import { PC, PBack } from "../shared";
import { FAQS } from "../../data/selfcareData";

export default function PFAQ({ nav }) { const [op, setOp] = useState(null); return <div><PBack nav={nav} /><h2 style={{ fontSize: 24, color: P.tx, margin: "0 0 22px", fontFamily: F.d }}>Preguntas Frecuentes</h2>{FAQS.map((f, i) => <PC key={i} style={{ cursor: "pointer" }}><div onClick={() => setOp(op === i ? null : i)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h3 style={{ margin: 0, fontSize: 15, color: P.tx, fontFamily: F.b }}>{f.q}</h3><span style={{ fontSize: 16, color: P.ac, transition: "transform 0.3s", transform: op === i ? "rotate(45deg)" : "" }}>+</span></div>{op === i && <p style={{ margin: "12px 0 0", color: P.txM, fontSize: 14, lineHeight: 1.8 }}>{f.a}</p>}</PC>)}</div>; }
