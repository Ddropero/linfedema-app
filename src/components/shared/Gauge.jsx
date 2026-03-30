import { F } from "../../styles/palette";
export default function Gauge({ v, max, label, color, sz = 80 }) {
  const pct = max > 0 ? (v / max) * 100 : 0, r = (sz - 10) / 2, ci = 2 * Math.PI * r, off = ci - (pct / 100) * ci;
  return <div style={{ textAlign: "center" }}><svg width={sz} height={sz} style={{ transform: "rotate(-90deg)" }}><circle cx={sz/2} cy={sz/2} r={r} stroke="rgba(100,116,139,0.12)" strokeWidth={7} fill="none" /><circle cx={sz/2} cy={sz/2} r={r} stroke={color} strokeWidth={7} fill="none" strokeDasharray={ci} strokeDashoffset={off} strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.5s" }} /></svg><div style={{ marginTop: -sz/2 - 12, fontSize: 16, fontWeight: 800, color, fontFamily: F.m }}>{v.toFixed(1)}</div><div style={{ fontSize: 9, color: "#64748b", marginTop: 3 }}>/ {max}</div><div style={{ fontSize: 10, color: "#94a3b8", marginTop: 5, fontWeight: 600 }}>{label}</div></div>;
}
