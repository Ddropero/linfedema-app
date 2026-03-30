import { F } from "../../styles/palette";
export default function Bdg({ t, c }) { return <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 16, fontSize: 11.5, fontWeight: 700, background: `${c}18`, color: c, border: `1px solid ${c}33`, fontFamily: F.b }}>{t}</span>; }
