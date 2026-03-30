import { F, P } from "../../styles/palette";
import { PC, PBack } from "../shared";

export default function PExercise({ nav }) {
  return <div><PBack nav={nav} />
    <h2 style={{ fontSize: 24, color: P.tx, margin: "0 0 6px", fontFamily: F.d }}>Ejercicio y Linfedema</h2>
    <p style={{ color: P.txM, fontSize: 14, margin: "0 0 22px" }}>La evidencia científica demuestra que el ejercicio es seguro y beneficioso</p>
    <PC style={{ background: "#f0fdf4", border: "2px solid #bbf7d0" }}>
      <h3 style={{ margin: "0 0 8px", color: "#166534", fontSize: 16, fontFamily: F.b }}>✅ El ejercicio NO empeora el linfedema</h3>
      <p style={{ margin: 0, color: "#15803d", fontSize: 14, lineHeight: 1.8 }}>El ensayo PAL (Physical Activity and Lymphedema) de 2009 fue fundamental: en pacientes de alto riesgo (≥5 ganglios removidos), solo el 7% del grupo de ejercicio tuvo brotes vs. 22% del grupo control. El ejercicio supervisado es protector.</p>
    </PC>
    {[{ t: "¿Qué tipo de ejercicio puedo hacer?", items: ["Caminar — es la forma más natural de activar las bombas musculares","Nadar — excelente porque el agua ejerce compresión natural","Yoga — mejora flexibilidad y circulación","Bicicleta estática — ejercicio aeróbico de bajo impacto","Ejercicio de resistencia (pesas) — seguro si se inicia con cargas bajas y se progresa lentamente"], c: "#0284c7" },
      { t: "Recomendaciones clave", items: ["Use SIEMPRE su prenda compresiva durante el ejercicio","Comience con intensidad baja y aumente gradualmente","Si nota hinchazón persistente 24h después, reduzca la intensidad (no abandone)","Idealmente, ejercite bajo supervisión de un profesional certificado en linfedema","El sistema linfático depende de la contracción muscular para funcionar — moverse ES tratamiento"], c: "#0d9488" },
      { t: "Lo que dice la ciencia reciente (2024-2025)", items: ["Los ejercicios de resistencia progresiva no aumentan el volumen del miembro ni empeoran los síntomas","Ejercitar CON compresión produce mejores resultados que sin ella en el manejo del fluido","El ejercicio aeróbico y de resistencia combinados son seguros pero requieren estudios más grandes","Las guías ACSM recomiendan ejercicio para pacientes con linfedema relacionado con cáncer"], c: "#8b5cf6" }].map((sec, i) => (
      <PC key={i} style={{ borderLeft: `4px solid ${sec.c}` }}>
        <h3 style={{ margin: "0 0 10px", color: sec.c, fontSize: 16, fontFamily: F.b }}>{sec.t}</h3>
        {sec.items.map((item, j) => <div key={j} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><div style={{ width: 6, height: 6, borderRadius: "50%", background: sec.c, marginTop: 7, flexShrink: 0 }} /><p style={{ margin: 0, color: P.tx, fontSize: 14, lineHeight: 1.7 }}>{item}</p></div>)}
      </PC>
    ))}
  </div>;
}
