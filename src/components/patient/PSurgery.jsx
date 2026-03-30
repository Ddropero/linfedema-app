import { F, P } from "../../styles/palette";
import { PC, PBack } from "../shared";

export default function PSurgery({ nav }) {
  return <div><PBack nav={nav} />
    <h2 style={{ fontSize: 24, color: P.tx, margin: "0 0 6px", fontFamily: F.d }}>Opciones Quirúrgicas</h2>
    <p style={{ color: P.txM, fontSize: 14, margin: "0 0 22px" }}>Cuando el tratamiento conservador no es suficiente</p>
    <PC style={{ background: P.acL, border: `1px solid ${P.ac}33` }}>
      <p style={{ margin: 0, color: P.ac, fontSize: 14, fontWeight: 600, lineHeight: 1.7 }}>📌 La cirugía NO reemplaza el tratamiento conservador. Es un complemento para pacientes seleccionados. Se evalúa después de al menos 3 meses de TDC.</p>
    </PC>
    {[{ n: "ALV — Anastomosis Linfático-Venosa", d: "Cirugía mínimamente invasiva que conecta vasos linfáticos a venas pequeñas para restaurar el drenaje.", datos: "Resultados del ensayo N-LVA 2024: mejoras significativas en función física y mental. El 42% de pacientes logró suspender parcial o totalmente las prendas compresivas. Reducción promedio de 30-35% en volumen y casi 2 episodios menos de celulitis por año.", para: "Pacientes con linfedema temprano o moderado (ISL I-II) con vasos linfáticos funcionales demostrados por MRL.", c: "#0d9488", ic: "🔬" },
      { n: "TLV — Transferencia de Ganglios Vascularizados", d: "Se trasplantan ganglios linfáticos sanos de otra parte del cuerpo al área afectada.", datos: "Muestra una respuesta más lenta pero más duradera que la ALV. Útil cuando no hay vasos funcionales para ALV.", para: "Pacientes con linfedema avanzado o sin vasos aptos para ALV.", c: "#0284c7", ic: "🏥" },
      { n: "Liposucción para linfedema", d: "Remueve el exceso de tejido graso que se acumula en el linfedema crónico.", datos: "Efectiva cuando predomina el componente graso (sin fóvea). Requiere compresión de por vida después.", para: "Pacientes con predominio adiposo en estadios II-III.", c: "#8b5cf6", ic: "💉" },
      { n: "LYMPHA — Cirugía preventiva", d: "Se realiza durante la cirugía oncológica para prevenir el desarrollo de linfedema.", datos: "En el estudio de Boccardo, solo el 4% desarrolló linfedema tras LYMPHA vs 13-65% sin ella. Es una técnica prometedora que se está expandiendo.", para: "Pacientes que van a ser sometidos a disección axilar o inguinal por cáncer.", c: "#6366f1", ic: "🛡️" }].map((p, i) => (
      <PC key={i} style={{ borderLeft: `4px solid ${p.c}` }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}><span style={{ fontSize: 22 }}>{p.ic}</span><h3 style={{ margin: 0, fontSize: 16, color: p.c, fontFamily: F.b }}>{p.n}</h3></div>
        <p style={{ color: P.tx, fontSize: 14, lineHeight: 1.7, margin: "0 0 10px" }}>{p.d}</p>
        <div style={{ background: `${p.c}08`, borderRadius: 10, padding: 14, marginBottom: 8 }}><p style={{ margin: 0, color: p.c, fontSize: 13, fontWeight: 600, lineHeight: 1.6 }}>📊 {p.datos}</p></div>
        <p style={{ margin: 0, color: P.txM, fontSize: 13 }}>👤 Indicada para: {p.para}</p>
      </PC>
    ))}
  </div>;
}
