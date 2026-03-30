import { P, F } from "../../styles/palette";
export default function PBack({ nav }) { return <button onClick={() => nav("home")} style={{ background: "none", border: "none", color: P.ac, fontSize: 13, cursor: "pointer", marginBottom: 16, fontFamily: F.b, fontWeight: 600 }}>← Volver al inicio</button>; }
