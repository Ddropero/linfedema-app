import { F, P } from "../../styles/palette";
import { PC, PBack } from "../shared";

export default function PEdu({ nav }) {
  return <div><PBack nav={nav} />
    <h2 style={{ fontSize: 24, color: P.tx, margin: "0 0 6px", fontFamily: F.d }}>¿Qué es el linfedema?</h2>
    <p style={{ color: P.txM, fontSize: 14, margin: "0 0 22px" }}>Información esencial sobre su condición</p>
    <PC><h3 style={{ margin: "0 0 10px", color: P.tx, fontSize: 16, fontFamily: F.b }}>El sistema linfático</h3><p style={{ color: P.tx, fontSize: 14, lineHeight: 1.8, margin: 0 }}>Su cuerpo tiene un sistema de vasos linfáticos que transportan linfa — un líquido rico en proteínas, células inmunes y desechos metabólicos. Cuando este sistema se daña o no funciona, el líquido se acumula y produce hinchazón crónica. Afecta a 250 millones de personas en el mundo.</p></PC>
    <PC><h3 style={{ margin: "0 0 10px", color: P.tx, fontSize: 16, fontFamily: F.b }}>¿Por qué se produce?</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ background: "#f0fdf4", borderRadius: 12, padding: 16 }}><h4 style={{ margin: "0 0 6px", color: "#166534", fontSize: 14 }}>Primario</h4><p style={{ margin: 0, color: "#15803d", fontSize: 13, lineHeight: 1.6 }}>Alteración congénita del sistema linfático. Puede manifestarse desde el nacimiento o años después.</p></div>
        <div style={{ background: "#eff6ff", borderRadius: 12, padding: 16 }}><h4 style={{ margin: "0 0 6px", color: "#1e40af", fontSize: 14 }}>Secundario (más frecuente)</h4><p style={{ margin: 0, color: "#1d4ed8", fontSize: 13, lineHeight: 1.6 }}>Daño por cirugías oncológicas, radioterapia, trauma o infecciones. En Colombia se asocia principalmente a tratamientos de cáncer de mama.</p></div>
      </div>
    </PC>
    <PC><h3 style={{ margin: "0 0 10px", color: P.tx, fontSize: 16, fontFamily: F.b }}>¿Cómo se trata?</h3>
      <div style={{ background: P.acL, borderRadius: 12, padding: 16, marginBottom: 12 }}><p style={{ margin: 0, color: P.ac, fontSize: 14, fontWeight: 600 }}>📌 No tiene cura pero se controla muy bien. La TDC logra reducción de volumen del 40-60%. Muchos pacientes nunca necesitan cirugía.</p></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div style={{ border: `2px solid ${P.ac}`, borderRadius: 12, padding: 14 }}><h4 style={{ margin: "0 0 5px", color: P.ac, fontSize: 14 }}>Fase 1: Reductiva (3-8 sem)</h4><p style={{ margin: 0, color: P.txM, fontSize: 13, lineHeight: 1.6 }}>Sesiones intensivas con terapeuta: drenaje linfático manual + vendaje + ejercicio.</p></div>
        <div style={{ border: "2px solid #ca8a04", borderRadius: 12, padding: 14 }}><h4 style={{ margin: "0 0 5px", color: "#ca8a04", fontSize: 14 }}>Fase 2: Mantenimiento (indefinida)</h4><p style={{ margin: 0, color: P.txM, fontSize: 13, lineHeight: 1.6 }}>Usted toma el control: autocuidado, prenda compresiva, ejercicio y controles periódicos.</p></div>
      </div>
    </PC>
    <PC><h3 style={{ margin: "0 0 10px", color: P.tx, fontSize: 16, fontFamily: F.b }}>Opciones quirúrgicas (cuando son necesarias)</h3>
      <p style={{ color: P.tx, fontSize: 14, lineHeight: 1.8, margin: "0 0 12px" }}>Si después de 3 meses de TDC no hay mejoría suficiente, existen cirugías que pueden ayudar:</p>
      {[{ n: "ALV (Anastomosis Linfático-Venosa)", d: "Conecta vasos linfáticos a venas para restaurar el drenaje. Es mínimamente invasiva, con tasa de éxito >90% cuando se planifica con MRL. Reduce el volumen 30-35% y disminuye las infecciones.", c: "#0d9488" },
        { n: "TLV (Transferencia de Ganglios)", d: "Se trasplantan ganglios linfáticos sanos de otra parte del cuerpo. Para casos más avanzados.", c: "#0284c7" },
        { n: "LYMPHA (Cirugía preventiva)", d: "Se realiza durante la cirugía oncológica para prevenir el linfedema. Reduce la incidencia a solo 4% vs 13-65% sin ella.", c: "#8b5cf6" }].map((p, i) => (
        <div key={i} style={{ padding: 14, borderRadius: 12, marginBottom: 8, background: `${p.c}08`, borderLeft: `4px solid ${p.c}` }}>
          <h4 style={{ margin: "0 0 4px", color: p.c, fontSize: 14 }}>{p.n}</h4>
          <p style={{ margin: 0, color: P.tx, fontSize: 13, lineHeight: 1.6 }}>{p.d}</p>
        </div>
      ))}
    </PC>
  </div>;
}
