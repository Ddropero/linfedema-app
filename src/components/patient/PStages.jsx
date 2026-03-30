import { F, P } from "../../styles/palette";
import { Bdg, PC, PBack } from "../shared";
import { ISL } from "../../data/islStages";

export default function PStages({ nav }) { return <div><PBack nav={nav} /><h2 style={{ fontSize: 24, color: P.tx, margin: "0 0 22px", fontFamily: F.d }}>Estadios del Linfedema (ISL)</h2>{ISL.map((s, i) => <PC key={i} style={{ borderLeft: `5px solid ${s.c}` }}><div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}><Bdg t={s.s} c={s.c} /><span style={{ fontWeight: 700, color: s.c, fontSize: 14 }}>{s.n}</span></div><p style={{ color: P.tx, fontSize: 14, lineHeight: 1.7, margin: "0 0 8px" }}>{s.pt}</p><div style={{ background: `${s.c}08`, borderRadius: 8, padding: "8px 12px" }}><p style={{ margin: 0, color: s.c, fontSize: 13, fontWeight: 600 }}>Tratamiento: {s.tx}</p></div></PC>)}</div>; }
