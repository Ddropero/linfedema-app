import { useState, useMemo, useRef } from "react";

// ── AUTH & BLOG UTILITIES ──
const USERS_KEY = "lf_users", CURRENT_KEY = "lf_current", BLOG_KEY = "lf_blog";
const DEMO_USERS = [
  { id: "u1", name: "Dr. Juan García", email: "doctor@reina.com", password: "doctor123", role: "doctor" },
  { id: "u2", name: "María Rodríguez", email: "paciente@demo.com", password: "paciente123", role: "patient" },
];
const DEMO_POSTS = [
  {
    id: "p1",
    title: "Ejercicio y linfedema: 15 años de evidencia dicen que sí se puede",
    excerpt: "El ensayo PAL y los metaanálisis más recientes destruyen el mito de que el ejercicio agrava el linfedema. La ciencia es contundente: moverse es parte del tratamiento.",
    content: "Durante años, a muchas pacientes con linfedema se les dijo que debían evitar el ejercicio, levantar peso o hacer esfuerzo físico. Hoy sabemos que eso era un error.\n\n**El ensayo PAL: el estudio que cambió todo**\n\nEn 2009, Schmitz y colaboradores publicaron en The Lancet Oncology el ensayo PAL (Physical Activity and Lymphedema), el primer ensayo aleatorizado controlado que evaluó ejercicio de resistencia en sobrevivientes de cáncer de mama con linfedema. Los resultados fueron sorprendentes: el grupo que hacía ejercicio con pesas no solo no empeoró, sino que tuvo menos episodios de exacerbación que el grupo control (7% vs 22% en pacientes de alto riesgo). Referencia: Schmitz KH et al., Lancet Oncol 2009 (PMID 19687992).\n\n**¿Qué dicen los estudios más recientes?**\n\nDesde entonces, la evidencia solo se ha acumulado. Un metaanálisis de Paramanandam et al. (2021) que analizó 21 ensayos clínicos con más de 1.000 participantes confirmó que el ejercicio aeróbico y de resistencia es seguro para pacientes con linfedema relacionado con cáncer de mama. No aumenta el volumen del miembro, no empeora los síntomas y mejora significativamente la calidad de vida. Referencia: PMID 34669036.\n\n**¿Por qué el ejercicio ayuda al linfedema?**\n\nEl sistema linfático no tiene una bomba propia (como el corazón para la sangre). Depende de:\n- La contracción de los músculos, que empuja la linfa hacia arriba\n- La respiración diafragmática, que genera presión negativa en el tórax\n- El movimiento articular, que facilita el flujo en los vasos linfáticos superficiales\n\nEsto significa que moverse ES tratamiento. Estar sedentario, en cambio, favorece la acumulación de líquido.\n\n**Recomendaciones prácticas**\n\nLas guías internacionales (ACSM 2019, ISL 2020) recomiendan:\n- Use siempre su prenda compresiva durante el ejercicio\n- Comience con intensidad baja y aumente gradualmente\n- Incluya caminar, nadar, yoga o ejercicio de resistencia supervisado\n- Si nota hinchazón persistente más de 24 horas, reduzca la intensidad — pero no abandone\n\nRecuerde: el objetivo no es evitar el ejercicio. Es hacerlo de forma inteligente.",
    category: "Investigación",
    author: "Dr. Juan García",
    authorId: "u1",
    date: "2024-11-15",
    published: true,
    tags: ["ejercicio","evidencia","PAL trial","resistencia","metaanálisis"]
  },
  {
    id: "p2",
    title: "La terapia descongestiva completa (TDC): el pilar que nadie debe saltarse",
    excerpt: "Antes de cualquier cirugía, la TDC es obligatoria. Entender por qué y cómo funciona puede marcar la diferencia entre un resultado bueno y uno excelente.",
    content: "La Terapia Descongestiva Completa (TDC) — también llamada Complete Decongestive Therapy o CDT en inglés — es el tratamiento de primera línea del linfedema en todo el mundo. Pero muchos pacientes no entienden del todo por qué se hace cada uno de sus componentes.\n\n**Los cuatro pilares de la TDC**\n\nLa TDC no es solo \"masajes\". Es un programa integral con cuatro componentes que deben realizarse juntos:\n\n- Drenaje linfático manual (DLM): Técnica especializada que redirige la linfa hacia ganglios sanos. Requiere terapeuta certificado. No es masaje común ni presoterapia sola.\n- Vendaje multicapa: Vendajes de baja elasticidad que mantienen la reducción lograda con el DLM. Se usan 23 horas al día durante la fase intensiva.\n- Ejercicio terapéutico: Movimientos específicos con el vendaje puesto, que activan las bombas musculares y potencian el efecto del DLM.\n- Cuidado de la piel: Hidratación y protección para prevenir infecciones. La piel del linfedema es la puerta de entrada de la celulitis.\n\n**¿Qué resultados se esperan?**\n\nLa fase reductiva (3-8 semanas, sesiones 3-5 veces por semana) típicamente logra reducciones del 40-60% del volumen en exceso. Un estudio de Szolnoky et al. demostró que la combinación de todos los componentes supera significativamente a cualquier tratamiento aislado. La presoterapia sola, por ejemplo, no sustituye al DLM manual.\n\n**La fase de mantenimiento: el trabajo de por vida**\n\nUna vez lograda la reducción máxima, comienza la fase de mantenimiento, que es indefinida:\n- Prenda compresiva personalizada durante el día\n- Autodrenaje linfático en casa (técnica aprendida con el terapeuta)\n- Ejercicio regular\n- Controles periódicos con el equipo\n\n**¿Por qué es obligatoria antes de cirugía?**\n\nLas guías internacionales (ISL 2020, Lymphatic Education & Research Network) exigen al menos 3 meses de TDC antes de evaluar cirugía. El motivo es doble: primero, porque muchos pacientes alcanzan resultados suficientes con TDC sola; segundo, porque la TDC preoperatoria reduce el volumen y mejora los resultados quirúrgicos. Referencia: Rockson SG & Rivera KK, Ann N Y Acad Sci 2008 (PMID 18250438).",
    category: "Educación",
    author: "Dr. Juan García",
    authorId: "u1",
    date: "2025-01-10",
    published: true,
    tags: ["TDC","drenaje linfático","vendaje","fisioterapia","tratamiento conservador"]
  },
  {
    id: "p3",
    title: "El peso emocional del linfedema: lo que los estudios confirman",
    excerpt: "Ansiedad, depresión, vergüenza, aislamiento. El impacto psicosocial del linfedema es real, medible y tratable. Ignorarlo es parte del problema.",
    content: "El linfedema no es solo una condición física. Sus efectos sobre la salud mental y el bienestar emocional son tan reales como la hinchazón misma — y a menudo, más difíciles de tratar.\n\n**¿Qué dice la investigación?**\n\nUn estudio pionero de Fu MR et al. (2013) evaluó el impacto psicosocial del linfedema en 140 sobrevivientes de cáncer de mama y encontró que el 82% reportó síntomas de ansiedad, el 57% mostró signos de depresión y el 72% reportó cambios negativos en la imagen corporal. Estos números son similares a los reportados en pacientes con condiciones crónicas severas como insuficiencia cardíaca. Referencia: PMID 23408392.\n\nUn metaanálisis posterior (Maree JE et al., 2021) que revisó 27 estudios confirmó que el linfedema se asocia consistentemente con mayor prevalencia de ansiedad y depresión, menor autoestima, deterioro de las relaciones íntimas y disminución de la participación social y laboral. Referencia: PMID 31322834.\n\n**Los mecanismos del impacto**\n\nEl linfedema afecta la salud mental por múltiples vías:\n\n- Visibilidad: La hinchazón puede ser difícil de ocultar, generando vergüenza y autoconciencia.\n- Funcionalidad: Las limitaciones para vestirse, trabajar, hacer deporte o actividades cotidianas generan frustración y pérdida de autonomía.\n- Incertidumbre: El linfedema es crónico y fluctuante. No saber \"cómo amanecerá\" genera ansiedad constante.\n- Carga económica: El costo de prendas, sesiones y controles es real, especialmente con cobertura limitada.\n- Sexualidad e intimidad: Estudios muestran que el linfedema afecta la vida sexual en el 40-60% de los pacientes.\n\n**¿Qué funciona?**\n\nLa evidencia respalda:\n- Grupos de apoyo entre pares: Reducen el aislamiento y mejoran la adherencia al tratamiento.\n- Terapia cognitivo-conductual (TCC): Eficaz para manejar la ansiedad y la imagen corporal.\n- Intervenciones de mindfulness: Varios ensayos muestran mejoras en calidad de vida y síntomas de ansiedad.\n- Educación del paciente: Comprender la condición reduce el miedo y mejora el afrontamiento.\n\n**Un mensaje importante**\n\nSi usted siente tristeza persistente, ansiedad que interfiere con su vida diaria, o ha perdido interés en actividades que antes disfrutaba, hablar con su equipo médico. La atención psicológica es parte del protocolo — no un lujo ni una señal de debilidad.",
    category: "Bienestar emocional",
    author: "Dr. Juan García",
    authorId: "u1",
    date: "2025-02-05",
    published: true,
    tags: ["psicosocial","ansiedad","depresión","imagen corporal","calidad de vida"]
  },
  {
    id: "p4",
    title: "Prendas compresivas: la ciencia detrás de algo que parece simple",
    excerpt: "¿Cómo elegir la prenda correcta? ¿Cuándo usarla? ¿Cada cuánto cambiarla? Las respuestas vienen de la investigación clínica.",
    content: "La prenda compresiva es, junto con el drenaje linfático manual, la herramienta más importante para el control del linfedema en el día a día. Sin embargo, no todas las prendas son iguales ni se usan de la misma manera.\n\n**¿Por qué funciona la compresión?**\n\nLa compresión externa reduce el espacio intersticial disponible para la acumulación de líquido y proteínas. Al mismo tiempo, aumenta la presión tisular, lo que favorece la reabsorción linfática y venosa. Un ensayo clínico de Vignes et al. demostró que las medias compresivas de clase II-III son significativamente más efectivas que la clase I para el mantenimiento del volumen reducido con TDC. Referencia: PMID 22950562.\n\n**Clases de compresión**\n\nLas prendas se clasifican según la presión ejercida:\n- Clase I (15-21 mmHg): Edemas leves, prevención en viajes.\n- Clase II (23-32 mmHg): Linfedema leve a moderado en mantenimiento.\n- Clase III (34-46 mmHg): Linfedema moderado a severo.\n- Clase IV (>49 mmHg): Casos severos, generalmente con vendaje o prendas de noche.\n\nSu médico o terapeuta indicará la clase adecuada para su caso. No use una prenda comprada sin medición profesional.\n\n**Compresión durante el ejercicio: ¿obligatoria?**\n\nSí. Los estudios que demuestran que el ejercicio es seguro en linfedema fueron realizados con prendas compresivas puestas. Un análisis secundario del PAL Trial mostró que los pacientes que hacían ejercicio sin prenda tenían más probabilidades de brotes que los que la usaban. Esto no significa que un día sin prenda sea desastroso, pero es la recomendación basada en evidencia.\n\n**Vida útil y cuidado**\n\nUna prenda compresiva pierde entre el 30-40% de su elasticidad después de 6 meses de uso diario, aunque la recomendación estándar es reemplazarla cada 4-6 meses. Lávela a mano o en bolsa de lavandería con agua tibia — el calor excesivo destruye las fibras elásticas. Seque a temperatura ambiente, nunca en secadora.\n\n**¿Y de noche?**\n\nLas prendas de compresión circular (medias y mangas estándar) no están diseñadas para dormir — la posición horizontal con compresión firme puede interrumpir la circulación. Para la noche existen prendas especiales de baja elasticidad o vendajes nocturnos. Consulte a su terapeuta.\n\n**Lo que aprendemos de la investigación reciente**\n\nUn estudio de Dayes et al. (2013) en JAMA demostró que la compresión con medias desde el diagnóstico reduce significativamente el riesgo de progresión del linfedema subclínico a clínico. La intervención temprana marca la diferencia.",
    category: "Autocuidado",
    author: "Dr. Juan García",
    authorId: "u1",
    date: "2025-02-28",
    published: true,
    tags: ["compresión","prenda","mantenimiento","autocuidado","evidencia"]
  },
  {
    id: "p5",
    title: "Cirugía del linfedema en 2024: lo que ha cambiado y lo que sigue igual",
    excerpt: "El ensayo N-LVA 2024 publicó sus resultados. La linfangiorresonancia guía la selección. La tecnología robótica emerge. ¿Qué significa todo esto para los pacientes?",
    content: "La cirugía del linfedema ha evolucionado enormemente en la última década. Pero la pregunta que más hacen los pacientes sigue siendo la misma: ¿cuándo es el momento de operarse?\n\n**El ensayo N-LVA 2024: el más importante hasta la fecha**\n\nEl ensayo N-LVA (Nordic Lymphovenous Anastomosis) es el primer ensayo aleatorizado controlado de alta calidad que evaluó la anastomosis linfático-venosa (ALV) vs. cirugía simulada en pacientes con linfedema de extremidad superior. Sus resultados, publicados en 2024, mostraron:\n- Mejora estadísticamente significativa en el Lymph-ICF (instrumento de calidad de vida) en el grupo ALV\n- El 42% de pacientes del grupo ALV redujo o suspendió el uso de prendas compresivas\n- Reducción promedio de volumen del 30-35%\n- Reducción de episodios de celulitis de casi 2 por año\n\nEsto es relevante porque confirma, con el más alto nivel de evidencia, algo que los cirujanos venían observando en series de casos: la ALV funciona cuando el paciente está bien seleccionado.\n\n**La linfangiorresonancia magnética (MRL): el GPS quirúrgico**\n\nUno de los avances más importantes de los últimos años no es una cirugía sino un estudio de imagen. La MRL permite visualizar los vasos linfáticos en 3D sin radiación, identificar cuáles están funcionales y cuáles están obstruidos, y planificar con precisión los sitios de anastomosis.\n\nCuando la MRL preoperatoria se combina con la angiografía por indocianina verde (ICG) intraoperatoria, la tasa de éxito supera el 90% (Kim et al., Plast Reconstr Surg 2022). Esta combinación se está convirtiendo en el estándar en centros especializados.\n\n**¿Quién es buen candidato para ALV?**\n\nUn candidato ideal tiene:\n- Linfedema estadio I o II (ISL)\n- Vasos linfáticos funcionales demostrados por MRL\n- Al menos 3 meses de TDC sin respuesta suficiente\n- IMC ≤ 35\n- Sin infección activa\n\nLos pacientes con estadios más avanzados o sin vasos funcionales pueden ser candidatos para transferencia de ganglios linfáticos vascularizados (TLV) o liposucción de linfedema.\n\n**La cirugía preventiva LYMPHA: una ventana de oportunidad**\n\nPara pacientes que van a recibir disección axilar o inguinal por cáncer, existe la opción de LYMPHA (Lymphatic Microsurgical Preventive Healing Approach), una técnica desarrollada por Boccardo y su equipo que anastomosa vasos linfáticos a venas locales durante la misma cirugía oncológica.\n\nLos resultados son notables: solo el 4% de pacientes con LYMPHA desarrolló linfedema, frente al 13-65% sin intervención (Boccardo et al., Ann Surg Oncol 2009, PMID 19148720). Si usted está programado para una cirugía oncológica que incluya disección de ganglios, pregunte a su cirujano si LYMPHA es una opción.\n\n**Lo que no cambia**\n\nA pesar de los avances, algo permanece igual: la cirugía no cura el linfedema. Es un complemento, no un reemplazo del tratamiento conservador. La TDC y la compresión siguen siendo necesarias después de cualquier intervención quirúrgica.",
    category: "Investigación",
    author: "Dr. Juan García",
    authorId: "u1",
    date: "2025-03-15",
    published: true,
    tags: ["cirugía","ALV","N-LVA","MRL","LYMPHA","linfangiorresonancia"]
  },
  {
    id: "p6",
    title: "Cómo viajar con linfedema: guía práctica basada en evidencia",
    excerpt: "El Consenso ACS/LANA 2023 actualiza las recomendaciones. Descubra qué es necesario, qué es opcional y qué es mito en los viajes con linfedema.",
    content: "Tener linfedema no significa que no pueda viajar. Pero sí significa que hay que prepararse bien. Las recomendaciones han cambiado en los últimos años gracias a nueva evidencia.\n\n**¿Los aviones empeoran el linfedema?**\n\nEsta es una de las preguntas más frecuentes. La respuesta honesta, según la evidencia actual, es: depende. Un estudio de Kilbreath et al. (2016) no encontró aumentos significativos de volumen en pacientes con linfedema de brazo durante vuelos de hasta 5 horas, con o sin prenda compresiva. Sin embargo, la variabilidad individual es importante: algunas pacientes sí reportan brotes asociados a viajes.\n\nEl Consenso ACS/LANA (American Cancer Society / Lymphatic Association of North America) de 2023 actualiza sus recomendaciones anteriores y reconoce que:\n- No existe evidencia fuerte de que los vuelos cortos sin compresión sean peligrosos\n- La recomendación de usar prenda durante el vuelo sigue siendo razonable como precaución\n- Los vuelos largos (>4-5 horas) representan mayor riesgo por inmovilidad prolongada\n\n**Recomendaciones prácticas para el vuelo**\n\n- Use su prenda compresiva habitual durante el vuelo\n- Levántese y camine por el pasillo cada 1-2 horas\n- Haga ejercicios de bombeo (tobillo, muñeca, rodilla) desde el asiento\n- Mantenga hidratación adecuada: evite el exceso de alcohol y bebidas con cafeína\n- Si tolera mal los cambios de presión, comuníqueselo a su terapeuta antes del viaje\n\n**En el destino**\n\n- Lleve siempre una prenda de repuesto en el equipaje de mano\n- Continúe su rutina de autodrenaje y cuidado de la piel\n- Evite temperaturas extremas: saunas, baños muy calientes, exposición prolongada al sol en climas húmedos\n- Si su médico le ha prescrito antibióticos de emergencia para celulitis, llévelos siempre\n- Lleve la información de contacto de su equipo médico por si necesita atención en el destino\n\n**Lo que dicen los estudios sobre riesgo en viajes**\n\nUn estudio de Graham et al. (2018) en Lymphatic Research and Biology no encontró diferencias en el riesgo de exacerbación entre pacientes que viajaban frecuentemente y los que no, siempre que mantuvieran las medidas de autocuidado. La conclusión: las medidas de prevención importan más que evitar el viaje.\n\n**Un recordatorio importante**\n\nNo deje de vivir por el linfedema. El aislamiento social y la restricción de actividades empeoran el bienestar emocional y pueden contribuir indirectamente a un peor control de la condición. Viajar, con las medidas adecuadas, es perfectamente compatible con un buen manejo del linfedema.",
    category: "Autocuidado",
    author: "Dr. Juan García",
    authorId: "u1",
    date: "2025-03-20",
    published: true,
    tags: ["viajes","avión","ACS/LANA","compresión","precauciones"]
  },
];
function getUsers() { try { const d = localStorage.getItem(USERS_KEY); if (d) return JSON.parse(d); localStorage.setItem(USERS_KEY, JSON.stringify(DEMO_USERS)); return [...DEMO_USERS]; } catch { return [...DEMO_USERS]; } }
function saveUsers(u) { try { localStorage.setItem(USERS_KEY, JSON.stringify(u)); } catch {} }
function getCurrentUser() { try { const d = localStorage.getItem(CURRENT_KEY); return d ? JSON.parse(d) : null; } catch { return null; } }
function setCurrentUser(u) { try { localStorage.setItem(CURRENT_KEY, JSON.stringify(u)); } catch {} }
function clearCurrentUser() { try { localStorage.removeItem(CURRENT_KEY); } catch {} }
function getBlogPosts() { try { const d = localStorage.getItem(BLOG_KEY); if (d) return JSON.parse(d); localStorage.setItem(BLOG_KEY, JSON.stringify(DEMO_POSTS)); return [...DEMO_POSTS]; } catch { return [...DEMO_POSTS]; } }
function saveBlogPosts(p) { try { localStorage.setItem(BLOG_KEY, JSON.stringify(p)); } catch {} }

/* ═══════════════════════════════════════════════════════════════════
   LINFEDEMA INTEGRAL v4.0 — CLÍNICA REINA SOFÍA / COLSANITAS
   Portal Pacientes + Portal Médicos — Enhanced with 2024-2025 Evidence
   ═══════════════════════════════════════════════════════════════════ */

// ── STYLES ──
const F = { d: "'Libre Baskerville','Georgia',serif", b: "'Source Sans 3','Segoe UI',sans-serif", m: "'JetBrains Mono',monospace" };
const P = { bg: "#faf8f5", card: "#fff", bdr: "#e8e2d9", tx: "#2c2418", txM: "#7a6e5d", ac: "#1a7a6d", acL: "#e6f5f2" };
const D = { bg: "linear-gradient(145deg,#020617 0%,#0c1929 40%,#0f172a 100%)", card: "rgba(15,23,42,0.65)", bdr: "rgba(100,220,220,0.12)", tx: "#e2e8f0", txM: "#64748b", ac: "#2dd4bf" };

// ── ISL STAGES ──
const ISL = [
  { s: "Estadio 0", n: "Latente", c: "#16a34a", desc: "Disfunción linfática sin edema clínico visible.", tx: "TDC preventiva / educación. Sin indicación quirúrgica.", pt: "Su sistema linfático muestra alteración pero aún no hay hinchazón visible. Con cuidados preventivos puede mantenerse estable." },
  { s: "Estadio I", n: "Reversible", c: "#ca8a04", desc: "Edema con fóvea. Cede con elevación 24h.", tx: "TDC primera línea. Reevaluar a 3 meses.", pt: "Hay hinchazón que mejora al elevar el miembro. Con tratamiento adecuado, esta etapa es reversible." },
  { s: "Estadio II", n: "Irreversible", c: "#ea580c", desc: "Edema persistente. Fibrosis progresiva. No cede con elevación.", tx: "TDC ≥ 3 meses. Si no responde → evaluación quirúrgica.", pt: "La hinchazón ya no desaparece con reposo y el tejido se endurece. Es importante el tratamiento activo." },
  { s: "Estadio III", n: "Elefantiasis", c: "#dc2626", desc: "Cambios distróficos severos (papilomatosis, fibrosis marcada).", tx: "Evaluación quirúrgica temprana. TDC preoperatoria obligatoria.", pt: "Etapa avanzada con cambios importantes en la piel. Se requiere evaluación quirúrgica." },
];

// ── LYMQOL ──
const LQ_ARM = {
  sintomas: { l: "Síntomas", i: "🩹", c: "#ef4444", q: ["¿Su brazo se siente pesado?","¿Se siente hinchado?","¿Tiene dolor?","¿Adormecimiento u hormigueo?","¿Rigidez?","¿Debilidad?","¿Tensión en la piel?"] },
  apariencia: { l: "Imagen corporal", i: "👁️", c: "#8b5cf6", q: ["¿Cohibido/a por la apariencia?","¿Dificultad encontrar ropa?","¿Dificultad usar ropa que le gusta?","¿Se siente menos atractivo/a?","¿Le afecta cómo lo/a miran?"] },
  funcion: { l: "Función", i: "🤚", c: "#0284c7", q: ["¿Dificultad tareas del hogar?","¿Dificultad en el trabajo?","¿Dificultad para moverse?","¿Dificultad para dormir?","¿Dificultad ocio/deporte?","¿Necesita ayuda de otros?"] },
  animo: { l: "Estado de ánimo", i: "💭", c: "#0d9488", q: ["¿Frustrado/a?","¿Deprimido/a?","¿Ansioso/a?","¿Pérdida de control?","¿Preocupación de empeoramiento?","¿Aislamiento?"] },
};
const LQ_LEG = {
  sintomas: { l: "Síntomas", i: "🩹", c: "#ef4444", q: ["¿Pierna pesada?","¿Hinchada?","¿Dolor?","¿Hormigueo?","¿Rigidez?","¿Debilidad?","¿Tensión piel?","¿Calor excesivo?"] },
  apariencia: { l: "Imagen corporal", i: "👁️", c: "#8b5cf6", q: ["¿Cohibido/a?","¿Dificultad ropa?","¿Dificultad calzado?","¿Menos atractivo/a?","¿Le afecta cómo lo/a miran?"] },
  funcion: { l: "Función", i: "🦵", c: "#0284c7", q: ["¿Dificultad hogar?","¿Dificultad trabajo?","¿Dificultad caminar?","¿Dificultad escaleras?","¿Dificultad dormir?","¿Dificultad ocio?","¿Necesita ayuda?"] },
  animo: { l: "Estado de ánimo", i: "💭", c: "#0d9488", q: ["¿Frustrado/a?","¿Deprimido/a?","¿Ansioso/a?","¿Pérdida de control?","¿Preocupación empeoramiento?","¿Aislamiento?"] },
};
const LICF = {
  fisica: { l: "Función Física", i: "💪", c: "#ef4444", q: ["Levantar objetos pesados","Cargar bolsas","Alcanzar objetos altos","Vestirse","Higiene personal","Rango de movimiento","Fuerza muscular"] },
  mental: { l: "Función Mental", i: "🧠", c: "#8b5cf6", q: ["Ansiedad","Tristeza/depresión","Frustración","Concentración","Autoestima"] },
  hogar: { l: "Hogar", i: "🏠", c: "#eab308", q: ["Cocinar","Limpiar","Lavar ropa","Compras","Jardín/mascotas"] },
  movilidad: { l: "Movilidad", i: "🚶", c: "#0284c7", q: ["Distancias cortas","Distancias largas","Escaleras","Transporte público","Estar de pie","Agacharse"] },
  social: { l: "Social/Laboral", i: "👥", c: "#0d9488", q: ["Actividades sociales","Relaciones personales","Vida sexual/pareja","Capacidad laboral","Modificar trabajo","Recreación"] },
};

// ── SELF-CARE DATA ──
const SELFCARE = [
  { t: "Cuidado de la piel", i: "🧴", c: "#0d9488", tips: ["Lave suavemente con jabón neutro y seque bien entre los dedos","Aplique crema hidratante sin fragancia diariamente","Evite cortes, quemaduras y picaduras — use guantes para jardinería","Use protector solar SPF 50+ en el miembro afectado","No se haga manicure/pedicure agresivo del lado afectado","Ante cualquier herida, lave y aplique antiséptico inmediatamente"] },
  { t: "Ejercicio — Es seguro y beneficioso", i: "🏃", c: "#0284c7", tips: ["El ejercicio NO empeora el linfedema. El ensayo PAL (2009) demostró que el ejercicio supervisado reduce el riesgo de brotes","Realice ejercicio regular: caminar, nadar, yoga, bicicleta estática","Use su prenda compresiva durante el ejercicio — la evidencia muestra mejores resultados con compresión","El ejercicio de resistencia (pesas) es seguro si se inicia gradualmente y bajo supervisión","Los músculos actúan como bombas que ayudan al drenaje linfático — por eso moverse es tratamiento","Si nota hinchazón persistente después de ejercitar, reduzca la intensidad, no suspenda por completo"] },
  { t: "Compresión", i: "🧦", c: "#8b5cf6", tips: ["Use su prenda compresiva todos los días según indicación médica","Reemplace la prenda cada 4-6 meses (pierden elasticidad)","Póngasela por la mañana antes de que aumente la hinchazón","Lleve siempre una prenda de repuesto cuando viaje","Consulte si nota marcas, irritación o cambio en la hinchazón"] },
  { t: "Autodrenaje linfático", i: "🤲", c: "#ea580c", tips: ["Practique las técnicas que le enseñó su terapeuta 1-2 veces al día","Realícelo antes de colocar la prenda compresiva","Use movimientos suaves y rítmicos — nunca masaje profundo","Comience siempre por el cuello y el tronco (abrir vías)","Si nota enrojecimiento, calor o fiebre, suspenda y consulte"] },
  { t: "Prevención de infecciones", i: "🛡️", c: "#dc2626", tips: ["No permita tomar presión arterial ni extraer sangre del lado afectado","Evite temperaturas extremas: saunas, baños muy calientes","No use ropa, joyas o relojes apretados en el miembro afectado","Mantenga vacunas al día","Ante enrojecimiento, calor, fiebre o rayas rojas — acuda a urgencias"] },
  { t: "Nutrición y peso corporal", i: "🥗", c: "#16a34a", tips: ["El sobrepeso empeora el linfedema — mantenga un peso saludable","Dieta equilibrada: frutas, verduras, proteínas magras","Reduzca el consumo de sal","Manténgase bien hidratado con agua","Consulte nutricionista si necesita apoyo personalizado"] },
  { t: "Viajes (Guías ACS/LANA 2023)", i: "✈️", c: "#6366f1", tips: ["Use prenda compresiva durante vuelos largos (>4 horas) — especialmente si ya tiene linfedema","Muévase frecuentemente: camine por el pasillo, haga ejercicios de tobillo/muñeca","Mantenga hidratación adecuada durante el viaje","Lleve antibióticos de emergencia si su médico los ha prescrito","No hay evidencia fuerte de que vuelos cortos sin compresión sean peligrosos, pero la precaución es razonable"] },
];

const EMOTIONAL = [
  { t: "Es normal sentirse así", desc: "La frustración, la tristeza y la ansiedad son respuestas comunes al vivir con linfedema. Usted no está solo/a: estudios muestran que hasta el 28% de sobrevivientes de cáncer de mama reportan malestar emocional relacionado con el linfedema." },
  { t: "Impacto en la imagen corporal", desc: "La hinchazón puede afectar cómo se ve y cómo se siente con su cuerpo. Esto puede impactar su confianza, su vida social y sus relaciones íntimas. Hablar con un profesional puede ayudar mucho." },
  { t: "No se aísle", desc: "Investigaciones muestran que el aislamiento social empeora los síntomas. Grupos de apoyo, actividades sociales y mantenerse activo/a son parte del tratamiento." },
  { t: "Busque apoyo profesional", desc: "Si siente tristeza persistente, ansiedad que le impide funcionar, o pérdida de interés en actividades, hable con su equipo médico. La atención psicológica es parte integral del manejo del linfedema." },
  { t: "La carga económica es real", desc: "El costo de prendas compresivas, terapias y consultas puede ser significativo. Hable con trabajo social de la clínica para conocer opciones de apoyo y cobertura." },
];

const FAQS = [
  { q: "¿Qué es el linfedema?", a: "Es una condición crónica donde se acumula líquido en los tejidos, generalmente en un brazo o pierna, debido a un problema en el sistema linfático. Causa hinchazón, pesadez y puede afectar su movilidad y calidad de vida." },
  { q: "¿El linfedema tiene cura?", a: "Actualmente no tiene cura definitiva, pero con tratamiento adecuado se controla muy bien. Muchos pacientes nunca necesitan cirugía. En casos seleccionados, la cirugía puede mejorar significativamente los resultados." },
  { q: "¿Puedo hacer ejercicio?", a: "¡Sí! El ensayo PAL demostró que el ejercicio supervisado es seguro y puede incluso reducir el riesgo de brotes. Use compresión durante el ejercicio y comience gradualmente." },
  { q: "¿Cuándo se necesita cirugía?", a: "Solo cuando tras al menos 3 meses de tratamiento conservador no hay mejoría suficiente. Su médico evaluará con MRL y otros estudios si la cirugía es apropiada." },
  { q: "¿Qué es la linfangiorresonancia (MRL)?", a: "Es un estudio que permite ver los vasos linfáticos en 3D sin radiación. Se usa para planificar cirugías y evaluar severidad. Cuando sus resultados coinciden con la ICG intraoperatoria, el éxito de la cirugía supera el 90%." },
  { q: "¿La cirugía elimina el linfedema?", a: "La cirugía mejora el drenaje linfático pero no elimina la condición por completo. La ALV reduce el volumen 30-35% en promedio y disminuye los episodios de celulitis en casi 2 por año. Muchos pacientes logran reducir o suspender el uso de compresión." },
  { q: "¿Qué es LYMPHA?", a: "Es una técnica preventiva que se realiza durante la cirugía oncológica (cuando se remueven ganglios). Estudios muestran que reduce la incidencia de linfedema a solo 4%, comparado con 13-65% sin ella." },
  { q: "¿Cuándo debo ir a urgencias?", a: "Si presenta enrojecimiento súbito, calor, fiebre, rayas rojas en la piel, o dolor intenso. Estos pueden ser signos de celulitis que requieren antibióticos urgentes." },
];

// ── AUTH SCREENS ──
function LoginScreen({ onLogin, onRegister }) {
  const [email, setEmail] = useState(""); const [pass, setPass] = useState(""); const [err, setErr] = useState("");
  const handleLogin = () => { const users = getUsers(); const user = users.find(u => u.email === email && u.password === pass); if (user) { setCurrentUser(user); onLogin(user); } else setErr("Correo o contraseña incorrectos"); };
  const inp = { width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(100,116,139,0.2)", background: "rgba(30,41,59,0.8)", color: "#e2e8f0", fontSize: 14, fontFamily: "'Source Sans 3','Segoe UI',sans-serif", boxSizing: "border-box" };
  return <div style={{ minHeight: "100vh", background: "#0c1117", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Source Sans 3','Segoe UI',sans-serif" }}>
    <div style={{ background: "rgba(15,23,42,0.9)", border: "1px solid rgba(100,220,220,0.12)", borderRadius: 20, padding: "40px 36px", width: 380, backdropFilter: "blur(12px)" }}>
      <p style={{ fontSize: 10, letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", fontWeight: 700, margin: "0 0 10px", fontFamily: "'JetBrains Mono',monospace" }}>CLÍNICA REINA SOFÍA — COLSANITAS</p>
      <h2 style={{ fontSize: 24, color: "#fff", margin: "0 0 6px", fontFamily: "'Libre Baskerville','Georgia',serif" }}>Bienvenido</h2>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: "0 0 28px" }}>Inicie sesión para acceder al programa de linfedema</p>
      <div style={{ marginBottom: 14 }}><label style={{ color: "#94a3b8", fontSize: 12, display: "block", marginBottom: 5 }}>Correo electrónico</label><input type="email" value={email} onChange={e => { setEmail(e.target.value); setErr(""); }} style={inp} /></div>
      <div style={{ marginBottom: 20 }}><label style={{ color: "#94a3b8", fontSize: 12, display: "block", marginBottom: 5 }}>Contraseña</label><input type="password" value={pass} onChange={e => { setPass(e.target.value); setErr(""); }} onKeyDown={e => e.key === "Enter" && handleLogin()} style={inp} /></div>
      {err && <p style={{ color: "#f87171", fontSize: 13, margin: "-10px 0 14px", textAlign: "center" }}>{err}</p>}
      <button onClick={handleLogin} style={{ width: "100%", padding: 12, borderRadius: 8, border: "none", background: "linear-gradient(135deg,#1a7a6d,#0f5a50)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Source Sans 3','Segoe UI',sans-serif", marginBottom: 14 }}>Iniciar sesión</button>
      <p style={{ textAlign: "center", color: "#475569", fontSize: 13, margin: 0 }}>¿No tiene cuenta?{" "}<button onClick={onRegister} style={{ background: "none", border: "none", color: "#2dd4bf", cursor: "pointer", fontSize: 13, fontWeight: 600, padding: 0 }}>Regístrese aquí</button></p>
      <div style={{ marginTop: 24, padding: "14px 16px", borderRadius: 10, background: "rgba(45,212,191,0.04)", border: "1px solid rgba(45,212,191,0.1)" }}>
        <p style={{ color: "#475569", fontSize: 11.5, margin: "0 0 4px", fontWeight: 600 }}>Cuentas de demo:</p>
        <p style={{ color: "#475569", fontSize: 11, margin: "2px 0", fontFamily: "'JetBrains Mono',monospace" }}>Médico: doctor@reina.com / doctor123</p>
        <p style={{ color: "#475569", fontSize: 11, margin: "2px 0", fontFamily: "'JetBrains Mono',monospace" }}>Paciente: paciente@demo.com / paciente123</p>
      </div>
    </div>
  </div>;
}

function RegisterScreen({ onBack, onRegistered }) {
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [pass, setPass] = useState(""); const [role, setRole] = useState("patient"); const [err, setErr] = useState("");
  const handleRegister = () => {
    if (!name.trim() || !email.trim() || !pass.trim()) { setErr("Complete todos los campos"); return; }
    const users = getUsers(); if (users.find(u => u.email === email)) { setErr("Este correo ya está registrado"); return; }
    const newUser = { id: Date.now().toString(), name, email, password: pass, role };
    users.push(newUser); saveUsers(users); setCurrentUser(newUser); onRegistered(newUser);
  };
  const inp = { width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(100,116,139,0.2)", background: "rgba(30,41,59,0.8)", color: "#e2e8f0", fontSize: 14, fontFamily: "'Source Sans 3','Segoe UI',sans-serif", boxSizing: "border-box" };
  return <div style={{ minHeight: "100vh", background: "#0c1117", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Source Sans 3','Segoe UI',sans-serif" }}>
    <div style={{ background: "rgba(15,23,42,0.9)", border: "1px solid rgba(100,220,220,0.12)", borderRadius: 20, padding: "40px 36px", width: 380, backdropFilter: "blur(12px)" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#2dd4bf", fontSize: 13, cursor: "pointer", marginBottom: 20, padding: 0, fontFamily: "'Source Sans 3','Segoe UI',sans-serif" }}>← Volver</button>
      <h2 style={{ fontSize: 24, color: "#fff", margin: "0 0 6px", fontFamily: "'Libre Baskerville','Georgia',serif" }}>Crear cuenta</h2>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: "0 0 24px" }}>Regístrese para acceder al programa</p>
      <div style={{ marginBottom: 12 }}><label style={{ color: "#94a3b8", fontSize: 12, display: "block", marginBottom: 5 }}>Nombre completo</label><input value={name} onChange={e => { setName(e.target.value); setErr(""); }} style={inp} /></div>
      <div style={{ marginBottom: 12 }}><label style={{ color: "#94a3b8", fontSize: 12, display: "block", marginBottom: 5 }}>Correo electrónico</label><input type="email" value={email} onChange={e => { setEmail(e.target.value); setErr(""); }} style={inp} /></div>
      <div style={{ marginBottom: 14 }}><label style={{ color: "#94a3b8", fontSize: 12, display: "block", marginBottom: 5 }}>Contraseña</label><input type="password" value={pass} onChange={e => { setPass(e.target.value); setErr(""); }} style={inp} /></div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ color: "#94a3b8", fontSize: 12, display: "block", marginBottom: 8 }}>Tipo de cuenta</label>
        <div style={{ display: "flex", gap: 8 }}>{[{ k: "patient", l: "Paciente", i: "🫂" },{ k: "doctor", l: "Médico / Terapeuta", i: "⚕️" }].map(r => <button key={r.k} onClick={() => setRole(r.k)} style={{ flex: 1, padding: "10px 8px", borderRadius: 8, border: `2px solid ${role===r.k?"#1a7a6d":"rgba(100,116,139,0.2)"}`, background: role===r.k?"rgba(26,122,109,0.1)":"transparent", color: role===r.k?"#2dd4bf":"#64748b", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Source Sans 3','Segoe UI',sans-serif" }}><div style={{ fontSize: 18, marginBottom: 3 }}>{r.i}</div>{r.l}</button>)}</div>
      </div>
      {err && <p style={{ color: "#f87171", fontSize: 13, margin: "-10px 0 14px", textAlign: "center" }}>{err}</p>}
      <button onClick={handleRegister} style={{ width: "100%", padding: 12, borderRadius: 8, border: "none", background: "linear-gradient(135deg,#1a7a6d,#0f5a50)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Source Sans 3','Segoe UI',sans-serif" }}>Crear cuenta</button>
    </div>
  </div>;
}

// ── SHARED COMPONENTS ──
function Bdg({ t, c }) { return <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 16, fontSize: 11.5, fontWeight: 700, background: `${c}18`, color: c, border: `1px solid ${c}33`, fontFamily: F.b }}>{t}</span>; }

function getSev(a, s) {
  if (s === 4) { if (a <= 1.5) return { t: "Sin afectación", c: "#16a34a" }; if (a <= 2.5) return { t: "Leve", c: "#ca8a04" }; if (a <= 3.25) return { t: "Moderada", c: "#ea580c" }; return { t: "Severa", c: "#dc2626" }; }
  if (a <= 2.5) return { t: "Sin afectación", c: "#16a34a" }; if (a <= 5) return { t: "Leve", c: "#ca8a04" }; if (a <= 7.5) return { t: "Moderada", c: "#ea580c" }; return { t: "Severa", c: "#dc2626" };
}

function Gauge({ v, max, label, color, sz = 80 }) {
  const pct = max > 0 ? (v / max) * 100 : 0, r = (sz - 10) / 2, ci = 2 * Math.PI * r, off = ci - (pct / 100) * ci;
  return <div style={{ textAlign: "center" }}><svg width={sz} height={sz} style={{ transform: "rotate(-90deg)" }}><circle cx={sz/2} cy={sz/2} r={r} stroke="rgba(100,116,139,0.12)" strokeWidth={7} fill="none" /><circle cx={sz/2} cy={sz/2} r={r} stroke={color} strokeWidth={7} fill="none" strokeDasharray={ci} strokeDashoffset={off} strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.5s" }} /></svg><div style={{ marginTop: -sz/2 - 12, fontSize: 16, fontWeight: 800, color, fontFamily: F.m }}>{v.toFixed(1)}</div><div style={{ fontSize: 9, color: "#64748b", marginTop: 3 }}>/ {max}</div><div style={{ fontSize: 10, color: "#94a3b8", marginTop: 5, fontWeight: 600 }}>{label}</div></div>;
}

// Patient components
function PC({ children, style: st }) { return <div style={{ background: "#fff", border: "1px solid #e8e2d9", borderRadius: 16, padding: 28, marginBottom: 20, boxShadow: "0 2px 12px rgba(44,36,24,0.04)", ...st }}>{children}</div>; }
function PBack({ nav }) { return <button onClick={() => nav("home")} style={{ background: "none", border: "none", color: P.ac, fontSize: 13, cursor: "pointer", marginBottom: 16, fontFamily: F.b, fontWeight: 600 }}>← Volver al inicio</button>; }

// Doctor components
function DC({ title: ti, children, accent: ac }) { return <div style={{ background: D.card, border: `1px solid ${D.bdr}`, borderRadius: 14, padding: 22, marginBottom: 18, borderLeft: ac ? `4px solid ${ac}` : undefined, backdropFilter: "blur(12px)" }}>{ti && <h3 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 700, color: "#e0f2fe", fontFamily: F.b }}>{ti}</h3>}{children}</div>; }
function DCk({ label, checked, onChange, desc }) { return <label style={{ display: "flex", gap: 10, padding: "9px 12px", borderRadius: 8, background: checked ? "rgba(45,212,191,0.08)" : "rgba(30,41,59,0.4)", border: `1px solid ${checked ? "rgba(45,212,191,0.3)" : "rgba(100,116,139,0.12)"}`, cursor: "pointer", marginBottom: 6, alignItems: "flex-start" }}><input type="checkbox" checked={checked} onChange={onChange} style={{ marginTop: 3, accentColor: "#2dd4bf", width: 16, height: 16 }} /><div><span style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 500, fontFamily: F.b }}>{label}</span>{desc && <p style={{ margin: "3px 0 0", color: "#94a3b8", fontSize: 12 }}>{desc}</p>}</div></label>; }
function NI({ label, value, onChange, unit, min, max, step }) { return <div style={{ marginBottom: 10 }}><label style={{ color: "#94a3b8", fontSize: 12, display: "block", marginBottom: 3, fontFamily: F.b }}>{label}</label><div style={{ display: "flex", gap: 6, alignItems: "center" }}><input type="number" value={value} onChange={e => onChange(Number(e.target.value))} min={min} max={max} step={step||0.1} style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(100,116,139,0.2)", borderRadius: 6, color: "#e2e8f0", padding: "7px 10px", fontSize: 14, width: 90, fontFamily: F.m }} />{unit && <span style={{ color: "#64748b", fontSize: 12 }}>{unit}</span>}</div></div>; }

/* ════════════════════════════════════════════════════════════════
   PATIENT PORTAL
   ════════════════════════════════════════════════════════════════ */

function PHome({ nav }) {
  return <div>
    <div style={{ background: "linear-gradient(135deg,#1a7a6d 0%,#0f5a50 50%,#134e4a 100%)", borderRadius: 24, padding: "52px 36px", marginBottom: 28, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
      <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", fontWeight: 700, margin: "0 0 10px", fontFamily: F.m }}>CLÍNICA REINA SOFÍA — COLSANITAS</p>
      <h1 style={{ fontSize: 32, color: "#fff", margin: "0 0 10px", fontFamily: F.d, lineHeight: 1.3 }}>Programa de Linfedema</h1>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", margin: "0 0 24px", maxWidth: 500, lineHeight: 1.7, fontFamily: F.b }}>Información, herramientas y acompañamiento para manejar su linfedema con confianza.</p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button onClick={() => nav("edu")} style={{ padding: "11px 22px", borderRadius: 10, border: "2px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: F.b }}>Entender mi condición</button>
        <button onClick={() => nav("selfcare")} style={{ padding: "11px 22px", borderRadius: 10, border: "none", background: "#fff", color: "#1a7a6d", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: F.b }}>Guía de autocuidado</button>
      </div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 28 }}>
      {[{ i: "📖", t: "¿Qué es el linfedema?", s: "Entienda su condición", to: "edu" },{ i: "🧴", t: "Autocuidado", s: "Cuidados diarios", to: "selfcare" },{ i: "💚", t: "Bienestar emocional", s: "Apoyo psicosocial", to: "emotional" },{ i: "❤️", t: "Calidad de vida", s: "Cuestionario LYMQOL", to: "qol" },{ i: "❓", t: "Preguntas frecuentes", s: "Respuestas claras", to: "faq" },{ i: "🚨", t: "Señales de alarma", s: "Cuándo consultar", to: "alarm" },{ i: "📊", t: "Estadios ISL", s: "Clasificación", to: "stages" },{ i: "🔬", t: "Cirugía", s: "Opciones quirúrgicas", to: "surgery" },{ i: "🏋️", t: "Ejercicio seguro", s: "Evidencia y guías", to: "exercise" },{ i: "📰", t: "Blog", s: "Artículos y noticias", to: "blog" }].map((x, i) => (
        <div key={i} onClick={() => nav(x.to)} style={{ background: "#fff", border: "1px solid #e8e2d9", borderRadius: 14, padding: 20, cursor: "pointer", transition: "all 0.2s", boxShadow: "0 1px 8px rgba(44,36,24,0.03)" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(44,36,24,0.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 8px rgba(44,36,24,0.03)"; }}>
          <span style={{ fontSize: 26 }}>{x.i}</span>
          <h3 style={{ margin: "8px 0 3px", fontSize: 14, fontWeight: 700, color: P.tx, fontFamily: F.b }}>{x.t}</h3>
          <p style={{ margin: 0, fontSize: 12, color: P.txM }}>{x.s}</p>
        </div>
      ))}
    </div>
    <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 14, padding: "18px 22px", display: "flex", gap: 12, alignItems: "flex-start" }}>
      <span style={{ fontSize: 22 }}>🚨</span>
      <div><h4 style={{ margin: "0 0 3px", color: "#991b1b", fontSize: 13, fontFamily: F.b }}>Señales de alarma — Acuda a urgencias si presenta:</h4><p style={{ margin: 0, color: "#7f1d1d", fontSize: 13, lineHeight: 1.6 }}>Enrojecimiento súbito, calor, fiebre, rayas rojas en la piel o dolor intenso en el miembro afectado.</p></div>
    </div>
  </div>;
}

function PEdu({ nav }) {
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

function PSelfCare({ nav }) {
  const [op, setOp] = useState(null);
  return <div><PBack nav={nav} />
    <h2 style={{ fontSize: 24, color: P.tx, margin: "0 0 6px", fontFamily: F.d }}>Guía de Autocuidado</h2>
    <p style={{ color: P.txM, fontSize: 14, margin: "0 0 22px" }}>Cuidados diarios basados en evidencia para controlar su linfedema</p>
    {SELFCARE.map((sec, i) => (
      <PC key={i} style={{ cursor: "pointer", border: op === i ? `2px solid ${sec.c}` : "1px solid #e8e2d9" }}>
        <div onClick={() => setOp(op === i ? null : i)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}><span style={{ fontSize: 26 }}>{sec.i}</span><h3 style={{ margin: 0, fontSize: 16, color: P.tx, fontFamily: F.b }}>{sec.t}</h3></div>
          <span style={{ fontSize: 16, color: P.txM, transition: "transform 0.3s", transform: op === i ? "rotate(180deg)" : "" }}>▾</span>
        </div>
        {op === i && <div style={{ marginTop: 14 }}>{sec.tips.map((tip, j) => <div key={j} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}><div style={{ width: 6, height: 6, borderRadius: "50%", background: sec.c, marginTop: 7, flexShrink: 0 }} /><p style={{ margin: 0, color: P.tx, fontSize: 14, lineHeight: 1.7 }}>{tip}</p></div>)}</div>}
      </PC>
    ))}
  </div>;
}

function PEmotional({ nav }) {
  return <div><PBack nav={nav} />
    <h2 style={{ fontSize: 24, color: P.tx, margin: "0 0 6px", fontFamily: F.d }}>Bienestar Emocional</h2>
    <p style={{ color: P.txM, fontSize: 14, margin: "0 0 22px" }}>El linfedema no solo afecta su cuerpo — también su bienestar emocional</p>
    <div style={{ background: "#f0fdf4", borderRadius: 14, padding: "18px 22px", marginBottom: 20, border: "1px solid #bbf7d0" }}>
      <p style={{ margin: 0, color: "#166534", fontSize: 14, lineHeight: 1.7 }}>💚 Estudios con seguimiento de hasta 10 años muestran que el linfedema impacta la salud mental, el funcionamiento social y la imagen corporal de forma significativa. Reconocer esto es el primer paso para sentirse mejor.</p>
    </div>
    {EMOTIONAL.map((e, i) => (
      <PC key={i} style={{ borderLeft: "4px solid #0d9488" }}>
        <h3 style={{ margin: "0 0 8px", color: P.tx, fontSize: 16, fontFamily: F.b }}>{e.t}</h3>
        <p style={{ margin: 0, color: P.tx, fontSize: 14, lineHeight: 1.8 }}>{e.desc}</p>
      </PC>
    ))}
    <PC style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}>
      <h3 style={{ margin: "0 0 8px", color: "#1e40af", fontSize: 16, fontFamily: F.b }}>Recursos de apoyo</h3>
      <p style={{ margin: 0, color: "#1d4ed8", fontSize: 14, lineHeight: 1.8 }}>En la Clínica Reina Sofía, el equipo de linfedema incluye psicología y trabajo social. No dude en solicitar una consulta con estos profesionales. Recuerde: cuidar su mente es parte del tratamiento.</p>
    </PC>
  </div>;
}

function PExercise({ nav }) {
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

function PSurgery({ nav }) {
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

function PStages({ nav }) { return <div><PBack nav={nav} /><h2 style={{ fontSize: 24, color: P.tx, margin: "0 0 22px", fontFamily: F.d }}>Estadios del Linfedema (ISL)</h2>{ISL.map((s, i) => <PC key={i} style={{ borderLeft: `5px solid ${s.c}` }}><div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}><Bdg t={s.s} c={s.c} /><span style={{ fontWeight: 700, color: s.c, fontSize: 14 }}>{s.n}</span></div><p style={{ color: P.tx, fontSize: 14, lineHeight: 1.7, margin: "0 0 8px" }}>{s.pt}</p><div style={{ background: `${s.c}08`, borderRadius: 8, padding: "8px 12px" }}><p style={{ margin: 0, color: s.c, fontSize: 13, fontWeight: 600 }}>Tratamiento: {s.tx}</p></div></PC>)}</div>; }

function PFAQ({ nav }) { const [op, setOp] = useState(null); return <div><PBack nav={nav} /><h2 style={{ fontSize: 24, color: P.tx, margin: "0 0 22px", fontFamily: F.d }}>Preguntas Frecuentes</h2>{FAQS.map((f, i) => <PC key={i} style={{ cursor: "pointer" }}><div onClick={() => setOp(op === i ? null : i)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h3 style={{ margin: 0, fontSize: 15, color: P.tx, fontFamily: F.b }}>{f.q}</h3><span style={{ fontSize: 16, color: P.ac, transition: "transform 0.3s", transform: op === i ? "rotate(45deg)" : "" }}>+</span></div>{op === i && <p style={{ margin: "12px 0 0", color: P.txM, fontSize: 14, lineHeight: 1.8 }}>{f.a}</p>}</PC>)}</div>; }

function PAlarm({ nav }) { return <div><PBack nav={nav} /><h2 style={{ fontSize: 24, color: P.tx, margin: "0 0 22px", fontFamily: F.d }}>¿Cuándo Consultar?</h2>
  <div style={{ background: "#fef2f2", border: "2px solid #fecaca", borderRadius: 16, padding: 26, marginBottom: 20 }}>
    <h3 style={{ margin: "0 0 12px", color: "#991b1b", fontSize: 17, fontFamily: F.b }}>🚨 Acuda a URGENCIAS:</h3>
    {["Enrojecimiento súbito y extenso","Fiebre ≥ 38°C","Rayas rojas que se extienden","Dolor intenso de aparición rápida","Calor local con hinchazón rápida","Heridas que no cicatrizan o supuran"].map((s, i) => <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}><span style={{ color: "#dc2626", fontWeight: 800, fontSize: 13 }}>!</span><p style={{ margin: 0, color: "#7f1d1d", fontSize: 14 }}>{s}</p></div>)}
  </div>
  <PC><h3 style={{ margin: "0 0 12px", color: "#b45309", fontSize: 15, fontFamily: F.b }}>⚠️ Consulte con su médico:</h3>
    {["Aumento progresivo de hinchazón pese a tratamiento","Prenda compresiva ya no queda bien","Dolor persistente","Cambios cutáneos: endurecimiento, verrugas, ampollas","Más de 2 celulitis en un año","Dificultad creciente para actividades diarias"].map((s, i) => <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}><div style={{ width: 5, height: 5, borderRadius: "50%", background: "#ea580c", marginTop: 7, flexShrink: 0 }} /><p style={{ margin: 0, color: P.tx, fontSize: 14 }}>{s}</p></div>)}
  </PC></div>; }

function PQOL({ nav }) {
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

function PBlog({ nav }) {
  const [posts] = useState(() => getBlogPosts().filter(p => p.published));
  const [cat, setCat] = useState("Todas");
  const cats = ["Todas","Educación","Autocuidado","Investigación","Noticias","Experiencias"];
  const catColors = { "Educación":"#0284c7","Autocuidado":"#0d9488","Investigación":"#8b5cf6","Noticias":"#ca8a04","Experiencias":"#ea580c" };
  const filtered = cat === "Todas" ? posts : posts.filter(p => p.category === cat);
  return <div><PBack nav={nav} />
    <h2 style={{ fontSize: 24, color: P.tx, margin: "0 0 6px", fontFamily: F.d }}>Blog de Linfedema</h2>
    <p style={{ color: P.txM, fontSize: 14, margin: "0 0 20px" }}>Artículos, consejos y novedades del equipo de Clínica Reina Sofía</p>
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 22 }}>{cats.map(c => <button key={c} onClick={() => setCat(c)} style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${cat===c?P.ac:"#e8e2d9"}`, background: cat===c?P.acL:"#fff", color: cat===c?P.ac:P.txM, fontSize: 12, fontWeight: cat===c?700:500, cursor: "pointer", fontFamily: F.b }}>{c}</button>)}</div>
    {filtered.length === 0 && <PC><p style={{ color: P.txM, textAlign: "center", fontSize: 14, margin: 0 }}>No hay artículos en esta categoría aún.</p></PC>}
    {filtered.map(post => <PC key={post.id} style={{ cursor: "pointer" }}>
      <div onClick={() => nav(`blogpost_${post.id}`)}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}><Bdg t={post.category} c={catColors[post.category]||P.ac} /><span style={{ color: P.txM, fontSize: 11 }}>{post.date}</span></div>
        <h3 style={{ margin: "0 0 8px", fontSize: 17, color: P.tx, fontFamily: F.d, lineHeight: 1.4 }}>{post.title}</h3>
        <p style={{ margin: "0 0 14px", color: P.txM, fontSize: 14, lineHeight: 1.7 }}>{post.excerpt}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ color: P.txM, fontSize: 12 }}>Por {post.author}</span><span style={{ color: P.ac, fontSize: 13, fontWeight: 600 }}>Leer artículo →</span></div>
      </div>
    </PC>)}
  </div>;
}

function PBlogPost({ nav, postId }) {
  const post = getBlogPosts().find(p => p.id === postId);
  const catColors = { "Educación":"#0284c7","Autocuidado":"#0d9488","Investigación":"#8b5cf6","Noticias":"#ca8a04","Experiencias":"#ea580c" };
  if (!post) return <div><button onClick={() => nav("blog")} style={{ background: "none", border: "none", color: P.ac, fontSize: 13, cursor: "pointer", marginBottom: 16, fontFamily: F.b, fontWeight: 600 }}>← Volver al blog</button><PC><p style={{ color: P.txM }}>Artículo no encontrado.</p></PC></div>;
  const paras = post.content.split("\n\n").filter(Boolean);
  const cc = catColors[post.category] || P.ac;
  return <div>
    <button onClick={() => nav("blog")} style={{ background: "none", border: "none", color: P.ac, fontSize: 13, cursor: "pointer", marginBottom: 16, fontFamily: F.b, fontWeight: 600 }}>← Volver al blog</button>
    <div style={{ marginBottom: 16 }}><Bdg t={post.category} c={cc} /></div>
    <h2 style={{ fontSize: 26, color: P.tx, margin: "0 0 12px", fontFamily: F.d, lineHeight: 1.3 }}>{post.title}</h2>
    <p style={{ color: P.txM, fontSize: 13, margin: "0 0 24px" }}>Por {post.author} · {post.date}</p>
    <PC style={{ borderLeft: `4px solid ${cc}` }}><p style={{ margin: 0, color: P.txM, fontSize: 14, lineHeight: 1.8, fontStyle: "italic" }}>{post.excerpt}</p></PC>
    {paras.map((para, i) => {
      if (para.startsWith("**") && para.endsWith("**")) return <h3 key={i} style={{ fontSize: 17, color: P.tx, margin: "20px 0 10px", fontFamily: F.d }}>{para.replace(/\*\*/g,"")}</h3>;
      if (para.includes("\n- ") || para.startsWith("- ")) { const items = para.split("\n").filter(l => l.startsWith("- ")).map(l => l.slice(2)); return <PC key={i}>{items.map((item, j) => <div key={j} style={{ display: "flex", gap: 8, marginBottom: 6 }}><div style={{ width: 6, height: 6, borderRadius: "50%", background: cc, marginTop: 7, flexShrink: 0 }} /><p style={{ margin: 0, color: P.tx, fontSize: 14, lineHeight: 1.7 }}>{item}</p></div>)}</PC>; }
      return <p key={i} style={{ color: P.tx, fontSize: 14, lineHeight: 1.8, margin: "0 0 14px" }}>{para}</p>;
    })}
    {post.tags && post.tags.length > 0 && <div style={{ marginTop: 20, display: "flex", gap: 6, flexWrap: "wrap" }}>{post.tags.map(t => <span key={t} style={{ padding: "3px 10px", borderRadius: 12, background: P.acL, color: P.ac, fontSize: 11, fontWeight: 600 }}>#{t}</span>)}</div>}
  </div>;
}

function PatientPortal({ user }) {
  const [pg, setPg] = useState("home");
  const ref = useRef(null);
  const nav = p => { setPg(p); ref.current?.scrollTo(0, 0); };
  const renderPage = () => {
    if (pg.startsWith("blogpost_")) return <PBlogPost nav={nav} postId={pg.replace("blogpost_","")} />;
    const pages = { home: <PHome nav={nav} />, edu: <PEdu nav={nav} />, selfcare: <PSelfCare nav={nav} />, emotional: <PEmotional nav={nav} />, exercise: <PExercise nav={nav} />, surgery: <PSurgery nav={nav} />, stages: <PStages nav={nav} />, faq: <PFAQ nav={nav} />, alarm: <PAlarm nav={nav} />, qol: <PQOL nav={nav} />, blog: <PBlog nav={nav} /> };
    return pages[pg] || pages.home;
  };
  return <div ref={ref} style={{ minHeight: "100vh", background: P.bg, fontFamily: F.b, overflowY: "auto" }}><div style={{ maxWidth: 820, margin: "0 auto", padding: "30px 26px 56px" }}>{renderPage()}</div></div>;
}

/* ════════════════════════════════════════════════════════════════
   DOCTOR PORTAL
   ════════════════════════════════════════════════════════════════ */
const DTABS = [
  { id: "eval", l: "Evaluación", i: "🔍" },{ id: "isl", l: "ISL", i: "📊" },{ id: "tdc", l: "TDC", i: "💪" },{ id: "calc", l: "UEL/LEL", i: "🧮" },{ id: "cvrs", l: "CVRS", i: "❤️" },{ id: "dec", l: "Decisión 3m", i: "⚖️" },{ id: "surg", l: "Cirugía", i: "🔬" },{ id: "fu", l: "Seguimiento", i: "📋" },{ id: "blog", l: "Blog", i: "✍️" },
];

function DEval() { const [c, setC] = useState({}); const t = k => setC(p => ({...p,[k]:!p[k]})); return <div><DC title="📋 Anamnesis">{[["pri","Linfedema primario (familiares/personales)"],["onc","Hx oncológica (cirugía, linfadenectomía, RT)"],["tra","Trauma / infecciones / filariasis"],["obe","Obesidad y comorbilidades"],["sym","Síntomas (dolor, pesadez, infecciones)"]].map(([k,l]) => <DCk key={k} label={l} checked={!!c[k]} onChange={() => t(k)} />)}</DC><DC title="🩺 Examen Físico">{[["cir","Circometría bilateral (prenda retirada ≥24h)"],["fov","Fóvea (pitting)"],["ste","Signo de Stemmer"],["ski","Cambios cutáneos"],["inf","Complicaciones activas"],["pho","Documentación fotográfica"]].map(([k,l]) => <DCk key={k} label={l} checked={!!c[k]} onChange={() => t(k)} />)}</DC><DC title="🔬 Imágenes" accent="#0284c7"><DCk label="Doppler venoso — descartar TVP/IVC" checked={!!c.dop} onChange={() => t("dop")} /><p style={{ color: "#64748b", fontSize: 11, fontStyle: "italic", margin: "5px 0 0" }}>* MRL a los 3 meses si indicación quirúrgica.</p></DC></div>; }

function DISL() { const [sel, setSel] = useState(null); return <div>{ISL.map((s, i) => <div key={i} onClick={() => setSel(i)} style={{ background: sel === i ? `${s.c}12` : D.card, border: `2px solid ${sel === i ? s.c : "rgba(100,116,139,0.12)"}`, borderRadius: 12, padding: "14px 16px", marginBottom: 10, cursor: "pointer" }}><div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}><div style={{ width: 10, height: 10, borderRadius: "50%", background: s.c }} /><span style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 14, fontFamily: F.b }}>{s.s}</span><Bdg t={s.n} c={s.c} /></div><p style={{ color: "#94a3b8", fontSize: 12.5, margin: "0 0 3px" }}>{s.desc}</p><p style={{ color: s.c, fontSize: 12, margin: 0, fontWeight: 600 }}>→ {s.tx}</p></div>)}<DC title="Severidad Volumétrica">{[["Leve: < 20%","#16a34a"],["Moderado: 20–40%","#ca8a04"],["Severo: > 40%","#dc2626"]].map(([l,c], i) => <div key={i} style={{ padding: "10px 14px", borderRadius: 8, marginBottom: 6, background: "rgba(30,41,59,0.4)", borderLeft: `3px solid ${c}`, color: "#e2e8f0", fontSize: 13 }}>{l}</div>)}</DC></div>; }

function DTDC() { const [c, setC] = useState({}); const t = k => setC(p => ({...p,[k]:!p[k]})); const resp = [["r1","Reducción circunferencia ≥ 10%"],["r2","Reducción/estabilización UEL/LEL"],["r3","Mejoría significativa LYMQOL/Lymph-ICF"],["r4","Control infecciones"],["r5","Autocuidado sin deterioro"]]; const rc = resp.filter(([k]) => c[k]).length; return <div><DC title="Fase 1 — Reductiva (3-8 sem)" accent={D.ac}><div style={{ background: "rgba(45,212,191,0.06)", borderRadius: 8, padding: 12, marginBottom: 12, border: "1px solid rgba(45,212,191,0.15)" }}><p style={{ color: D.ac, fontSize: 13, margin: 0, fontWeight: 600 }}>📌 Meta: reducción 40-60%. Sesiones 3-5/semana.</p></div>{[["dlm","DLM (Vodder, 3-5/sem)"],["ban","Vendaje multicapa"],["pre","Presoterapia neumática"],["exe","Ejercicios supervisados"],["ski","Cuidado piel / educación"]].map(([k,l]) => <DCk key={k} label={l} checked={!!c[k]} onChange={() => t(k)} />)}</DC><DC title="Criterios Respuesta (3 meses)">{resp.map(([k,l]) => <DCk key={k} label={l} checked={!!c[k]} onChange={() => t(k)} />)}<div style={{ marginTop: 10, padding: 10, borderRadius: 7, background: rc >= 4 ? "rgba(22,163,74,0.08)" : rc >= 2 ? "rgba(202,138,4,0.08)" : "rgba(220,38,38,0.08)" }}><p style={{ color: rc >= 4 ? "#16a34a" : rc >= 2 ? "#ca8a04" : "#dc2626", margin: 0, fontWeight: 700, fontSize: 13 }}>{rc >= 4 ? "✓ Adecuada → Conservador" : rc >= 2 ? "⚠ Parcial → Evaluar transición" : "✗ Insuficiente → Cirugía"}</p></div></DC></div>; }

function DCalc() { const [limb, setLimb] = useState("upper"); const [imc, setImc] = useState(25); const [affC, setAffC] = useState([0,0,0,0,0]); const [conC, setConC] = useState([0,0,0,0,0]); const uL = ["Muñeca","Antebrazo","Brazo dist.","Brazo prox."]; const lL = ["Tobillo","Pantorrilla","Rodilla","Muslo dist.","Muslo prox."]; const labels = limb === "upper" ? uL : lL; const cV = cs => { let v = 0; for (let i = 0; i < cs.length - 1; i++) { const c1 = cs[i], c2 = cs[i+1]; if (c1 > 0 && c2 > 0) { const r1 = c1/(2*Math.PI), r2 = c2/(2*Math.PI); v += (Math.PI*10*(r1*r1+r1*r2+r2*r2))/3; }} return v; }; const aV = cV(affC), cVo = cV(conC), idx = imc > 0 ? (aV/imc).toFixed(1) : 0, cIdx = imc > 0 ? (cVo/imc).toFixed(1) : 0, dP = cVo > 0 ? (((aV-cVo)/cVo)*100).toFixed(1) : 0; return <div><div style={{ display: "flex", gap: 6, marginBottom: 12 }}>{["upper","lower"].map(l => <button key={l} onClick={() => { setLimb(l); setAffC(l==="upper"?[0,0,0,0]:[0,0,0,0,0]); setConC(l==="upper"?[0,0,0,0]:[0,0,0,0,0]); }} style={{ padding: "6px 14px", borderRadius: 7, border: `1px solid ${limb===l?"#0284c7":"rgba(100,116,139,0.15)"}`, background: limb===l?"rgba(2,132,199,0.1)":"transparent", color: limb===l?"#0284c7":"#64748b", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>{l==="upper"?"UEL":"LEL"}</button>)}</div><DC><NI label="IMC" value={imc} onChange={setImc} unit="kg/m²" min={10} max={60} /></DC><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}><DC title="Afectado" accent="#dc2626">{labels.map((l, i) => <NI key={`a${i}`} label={l} value={affC[i]} onChange={v => { const n=[...affC]; n[i]=v; setAffC(n); }} unit="cm" min={0} max={200} />)}</DC><DC title="Contralateral" accent="#16a34a">{labels.map((l, i) => <NI key={`c${i}`} label={l} value={conC[i]} onChange={v => { const n=[...conC]; n[i]=v; setConC(n); }} unit="cm" min={0} max={200} />)}</DC></div><DC title="Resultados"><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>{[{ l: "Afectado", v: idx, c: "#dc2626" },{ l: "Sano", v: cIdx, c: "#16a34a" },{ l: "Dif.Vol.", v: `${dP}%`, c: Math.abs(dP)>=20?"#dc2626":Math.abs(dP)>=10?"#ca8a04":"#16a34a" }].map((r, i) => <div key={i} style={{ textAlign: "center", padding: 12, background: "rgba(30,41,59,0.5)", borderRadius: 10 }}><div style={{ fontSize: 22, fontWeight: 800, color: r.c, fontFamily: F.m }}>{r.v}</div><div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>{r.l}</div></div>)}</div></DC></div>; }

function DCVRS() {
  const [inst, setInst] = useState("lymqol"); const [limb, setLimb] = useState("arm"); const [lA, setLA] = useState({}); const [iA, setIA] = useState({}); const [aD, setAD] = useState(null);
  const doms = limb === "arm" ? LQ_ARM : LQ_LEG;
  const lS = useMemo(() => { const sc = {}; let ts = 0, tc = 0; Object.entries(doms).forEach(([dk, dom]) => { const v = dom.q.map((_, i) => lA[`${dk}_${i}`]).filter(Boolean); if (v.length) { sc[dk] = { avg: v.reduce((a, b) => a + b, 0) / v.length, ct: v.length, tot: dom.q.length }; ts += v.reduce((a, b) => a + b, 0); tc += v.length; } }); sc._ov = tc > 0 ? ts / tc : 0; sc._a = tc; sc._t = Object.values(doms).reduce((a, d) => a + d.q.length, 0); return sc; }, [lA, doms]);
  const iS = useMemo(() => { const sc = {}; let ts = 0, tc = 0; Object.entries(LICF).forEach(([dk, dom]) => { const v = dom.q.map((_, i) => iA[`${dk}_${i}`]).filter(Boolean); if (v.length) { sc[dk] = { avg: v.reduce((a, b) => a + b, 0) / v.length, ct: v.length, tot: dom.q.length, sum: v.reduce((a, b) => a + b, 0) }; ts += v.reduce((a, b) => a + b, 0); tc += v.length; } }); sc._tp = ts; sc._mp = 290; sc._pct = (ts/290)*100; sc._a = tc; sc._t = 29; return sc; }, [iA]);

  return <div>
    <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>{[{ k: "lymqol", l: "LYMQOL (1-4)" },{ k: "icf", l: "Lymph-ICF (VAS 0-10)" }].map(x => <button key={x.k} onClick={() => { setInst(x.k); setAD(null); }} style={{ flex: 1, padding: 10, borderRadius: 8, border: `2px solid ${inst===x.k?D.ac:"rgba(100,116,139,0.12)"}`, background: inst===x.k?"rgba(45,212,191,0.1)":"rgba(15,23,42,0.5)", color: inst===x.k?D.ac:"#64748b", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: F.b }}>{x.l}</button>)}</div>

    {inst === "lymqol" && <>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>{[{ k: "arm", l: "Arm" },{ k: "leg", l: "Leg" }].map(x => <button key={x.k} onClick={() => { setLimb(x.k); setLA({}); setAD(null); }} style={{ padding: "5px 12px", borderRadius: 6, border: `1px solid ${limb===x.k?"#0284c7":"rgba(100,116,139,0.12)"}`, background: limb===x.k?"rgba(2,132,199,0.1)":"transparent", color: limb===x.k?"#0284c7":"#64748b", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>{x.l}</button>)}<div style={{ marginLeft: "auto" }}><Bdg t={`${lS._a}/${lS._t}`} c="#0284c7" /></div></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>{Object.entries(doms).map(([dk, dom]) => { const sc = lS[dk], isA = aD===dk, sv = sc ? getSev(sc.avg,4) : null; return <div key={dk} onClick={() => setAD(isA?null:dk)} style={{ padding: 12, borderRadius: 10, cursor: "pointer", background: isA?`${dom.c}12`:D.card, border: `2px solid ${isA?dom.c:"rgba(100,116,139,0.1)"}` }}><div style={{ display: "flex", justifyContent: "space-between" }}><span>{dom.i}</span>{sc && <Bdg t={sc.avg.toFixed(1)} c={sv.c} />}</div><div style={{ fontWeight: 700, fontSize: 12, color: "#e2e8f0", marginTop: 5 }}>{dom.l}</div>{sc && <div style={{ fontSize: 10, color: sv.c, marginTop: 2, fontWeight: 600 }}>{sv.t}</div>}</div>; })}</div>
      {aD && doms[aD] && <DC title={`${doms[aD].i} ${doms[aD].l}`} accent={doms[aD].c}>{doms[aD].q.map((q, i) => <div key={i} style={{ padding: "8px 0", borderBottom: "1px solid rgba(100,116,139,0.06)" }}><p style={{ color: "#cbd5e1", fontSize: 13, margin: "0 0 6px" }}><span style={{ color: "#475569", fontSize: 11, fontFamily: F.m, marginRight: 5 }}>{i+1}.</span>{q}</p><div style={{ display: "flex", gap: 4 }}>{["Nada","Un poco","Bastante","Mucho"].map((l, j) => { const v=j+1, a=lA[`${aD}_${i}`]===v; const cs=["#16a34a","#ca8a04","#ea580c","#dc2626"]; return <button key={v} onClick={() => setLA(p => ({...p,[`${aD}_${i}`]:v}))} style={{ flex: 1, padding: "6px 2px", borderRadius: 6, fontSize: 11, fontWeight: a?700:500, border: `2px solid ${a?cs[j]:"rgba(100,116,139,0.1)"}`, background: a?`${cs[j]}15`:"rgba(30,41,59,0.4)", color: a?cs[j]:"#64748b", cursor: "pointer", fontFamily: F.b }}><div style={{ fontSize: 13, fontWeight: 800, fontFamily: F.m }}>{v}</div>{l}</button>; })}</div></div>)}</DC>}
      {lS._a > 0 && <DC title="Resultados LYMQOL" accent={D.ac}><div style={{ display: "flex", justifyContent: "space-around", gap: 8, marginBottom: 12 }}>{Object.entries(doms).map(([dk, dom]) => { const sc = lS[dk]; return sc ? <Gauge key={dk} v={sc.avg} max={4} label={dom.l} color={dom.c} sz={70} /> : null; })}</div><div style={{ textAlign: "center", padding: 12, background: "rgba(30,41,59,0.5)", borderRadius: 10 }}><div style={{ fontSize: 10, color: "#64748b" }}>Global</div><div style={{ fontSize: 26, fontWeight: 800, color: getSev(lS._ov,4).c, fontFamily: F.m }}>{lS._ov.toFixed(2)}</div><div style={{ fontSize: 12, color: getSev(lS._ov,4).c, fontWeight: 600 }}>{getSev(lS._ov,4).t}</div></div></DC>}
    </>}

    {inst === "icf" && <>
      <DC><p style={{ color: "#94a3b8", fontSize: 12, margin: 0 }}>29 items, VAS 0-10, 5 dominios. Cambio significativo: ≥15 pts. Medida primaria RCT N-LVA 2024.</p><div style={{ marginTop: 5 }}><Bdg t={`${iS._a}/29`} c="#0284c7" /></div></DC>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>{Object.entries(LICF).map(([dk, dom]) => { const sc = iS[dk], isA = aD===dk, sv = sc ? getSev(sc.avg,10) : null; return <div key={dk} onClick={() => setAD(isA?null:dk)} style={{ padding: 12, borderRadius: 10, cursor: "pointer", background: isA?`${dom.c}12`:D.card, border: `2px solid ${isA?dom.c:"rgba(100,116,139,0.1)"}` }}><div style={{ display: "flex", justifyContent: "space-between" }}><span>{dom.i}</span>{sc && <Bdg t={sc.avg.toFixed(1)} c={sv.c} />}</div><div style={{ fontWeight: 700, fontSize: 12, color: "#e2e8f0", marginTop: 5 }}>{dom.l}</div>{sc && <div style={{ fontSize: 10, color: sv.c, marginTop: 2, fontWeight: 600 }}>{sv.t}</div>}</div>; })}</div>
      {aD && LICF[aD] && <DC title={`${LICF[aD].i} ${LICF[aD].l}`} accent={LICF[aD].c}>{LICF[aD].q.map((q, i) => { const v = iA[`${aD}_${i}`]||0; const gc = v<=2?"#16a34a":v<=4?"#ca8a04":v<=6?"#ea580c":v<=8?"#dc2626":"#991b1b"; return <div key={i} style={{ padding: "10px 0", borderBottom: "1px solid rgba(100,116,139,0.06)" }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}><p style={{ color: "#cbd5e1", fontSize: 13, margin: 0, flex: 1 }}><span style={{ color: "#475569", fontSize: 11, fontFamily: F.m, marginRight: 5 }}>{i+1}.</span>{q}</p><span style={{ color: gc, fontSize: 17, fontWeight: 800, fontFamily: F.m, marginLeft: 8 }}>{v}</span></div><input type="range" min={0} max={10} value={v} onChange={e => setIA(p => ({...p,[`${aD}_${i}`]:Number(e.target.value)}))} style={{ width: "100%", accentColor: gc, height: 5 }} /></div>; })}</DC>}
      {iS._a > 0 && <DC title="Resultados Lymph-ICF" accent="#8b5cf6">{Object.entries(LICF).map(([dk, dom]) => { const s = iS[dk]; if (!s) return null; const pct = (s.avg/10)*100, sv = getSev(s.avg,10); return <div key={dk} style={{ marginBottom: 10 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}><span style={{ color: "#cbd5e1", fontSize: 12, fontWeight: 600 }}>{dom.i} {dom.l}</span><span style={{ color: sv.c, fontSize: 13, fontWeight: 800, fontFamily: F.m }}>{s.avg.toFixed(1)}</span></div><div style={{ height: 7, background: "rgba(30,41,59,0.8)", borderRadius: 4, overflow: "hidden" }}><div style={{ height: "100%", width: `${pct}%`, background: dom.c, borderRadius: 4 }} /></div></div>; })}<div style={{ textAlign: "center", padding: 14, background: "rgba(30,41,59,0.5)", borderRadius: 10, marginTop: 6 }}><div style={{ fontSize: 10, color: "#64748b" }}>Total</div><div style={{ fontSize: 24, fontWeight: 800, color: "#e2e8f0", fontFamily: F.m }}>{iS._tp}<span style={{ fontSize: 13, color: "#475569" }}>/290</span></div><div style={{ fontSize: 16, fontWeight: 700, color: getSev(iS._pct/10,10).c, fontFamily: F.m }}>{iS._pct.toFixed(1)}%</div></div></DC>}
    </>}
  </div>;
}

function DDec() { const [sc, setSc] = useState(null); const [ec, setEc] = useState({}); const t = k => setEc(p => ({...p,[k]:!p[k]})); return <div><DC title="Evaluación Obligatoria (3 meses)" accent="#0284c7">{[["e1","Circometría + UEL/LEL comparativo"],["e2","LYMQOL + Lymph-ICF comparativo"],["e3","VAS dolor"],["e4","Reclasificación ISL"],["e5","MRL (si indicación quirúrgica)"],["e6","Fotodocumentación"]].map(([k,l]) => <DCk key={k} label={l} checked={!!ec[k]} onChange={() => t(k)} />)}</DC>{[{ id: "A", t: "Continuar Conservador", c: "#16a34a", i: "✓", cr: ["Reducción ≥ 10%","Mejora LYMQOL/ICF","Control infecciones","Estabilidad ISL"] },{ id: "B", t: "Evaluar Cirugía", c: "#ea580c", i: "⚠", cr: ["Reducción < 10%","Sin mejora LYMQOL","Infecciones ≥ 2/año","Progresión ISL","Dependencia compresión"] },{ id: "C", t: "Urgencia Quirúrgica", c: "#dc2626", i: "🚨", cr: ["Estadio III severo","Infecciones ≥ 3-4/año","Sospecha linfangiosarcoma","Candidato LYMPHA preventivo"] }].map(s => <div key={s.id} onClick={() => setSc(s.id)} style={{ background: sc===s.id?`${s.c}10`:D.card, border: `2px solid ${sc===s.id?s.c:"rgba(100,116,139,0.1)"}`, borderRadius: 12, padding: 16, marginBottom: 10, cursor: "pointer" }}><div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}><span>{s.i}</span><span style={{ fontWeight: 700, fontSize: 14, color: s.c }}>{s.id}: {s.t}</span></div>{s.cr.map((c, i) => <div key={i} style={{ display: "flex", gap: 6, marginBottom: 2 }}><span style={{ color: s.c, fontSize: 8, marginTop: 5 }}>●</span><span style={{ color: "#cbd5e1", fontSize: 12.5 }}>{c}</span></div>)}</div>)}</div>; }

function DSurg() {
  const [sp, setSp] = useState(null); const [pc, setPc] = useState({}); const t = k => setPc(p => ({...p,[k]:!p[k]}));
  return <div>
    <DC title="Procedimientos — Evidencia 2024-2025">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[{ id: "alv", n: "ALV", c: "#0d9488", d: "ISL I-II con vasos funcionales. Éxito >90% (MRL+ICG). N-LVA RCT 2024: mejora Lymph-ICF, 42% suspende compresión. Reducción 30-35%, ~2 celulitis/año menos.", sub: "Sutura 11-0/12-0. Candidato ideal: temprano, vasos permeables por MRL." },
          { id: "tlv", n: "TLV", c: "#0284c7", d: "Avanzados o sin vasos. Respuesta más lenta pero más duradera que ALV. Donantes: inguinal, supraclavicular, submental.", sub: "Riesgo de linfedema en sitio donante." },
          { id: "lipo", n: "Liposucción", c: "#8b5cf6", d: "Componente graso, sin fóvea. Compresión de por vida. Mejor resultado en MRL estadio 3 (Seoul National University).", sub: "No curativa. Puede combinarse con ALV." },
          { id: "cha", n: "Charles", c: "#dc2626", d: "Estadio III, fibrosis severa. Última opción. Peores resultados cosméticos.", sub: "Procedimiento reductor de volumen." },
          { id: "lym", n: "LYMPHA", c: "#6366f1", d: "Preventiva durante ALND. Boccardo: 4.05% incidencia vs 13-65%. Levy 2024: resultados a 4 años.", sub: "Requiere microscopio quirúrgico. Coordinación cirujano oncológico + plástico." }].map(p => (
          <div key={p.id} onClick={() => setSp(sp===p.id?null:p.id)} style={{ padding: 14, borderRadius: 10, background: sp===p.id?`${p.c}12`:"rgba(30,41,59,0.5)", border: `2px solid ${sp===p.id?p.c:"rgba(100,116,139,0.1)"}`, cursor: "pointer" }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: p.c, fontFamily: F.m }}>{p.n}</div>
            <p style={{ fontSize: 12, color: "#94a3b8", margin: "4px 0 0", lineHeight: 1.5 }}>{p.d}</p>
            {sp===p.id && <p style={{ fontSize: 11.5, color: p.c, margin: "6px 0 0", fontWeight: 600 }}>{p.sub}</p>}
          </div>
        ))}
      </div>
    </DC>
    <DC title="Selección quirúrgica por MRL (Seoul Nat. Univ.)" accent="#8b5cf6">
      {[["MRL Estadio 1","LVA sola — mayor reducción volumétrica en estos pacientes","#16a34a"],["MRL Estadio 2","LVA sola — mejores resultados volumétricos y satisfacción","#ca8a04"],["MRL Estadio 3","LVA + Liposucción — reducción significativa y alta satisfacción","#ea580c"],["Severidad alta (BIA)","LVA + TLV — mayor reducción fluido corporal por BIA","#dc2626"]].map(([s,d,c], i) => <div key={i} style={{ padding: "10px 14px", borderRadius: 8, marginBottom: 6, background: "rgba(30,41,59,0.4)", borderLeft: `3px solid ${c}` }}><span style={{ color: c, fontWeight: 700, fontSize: 12.5 }}>{s}: </span><span style={{ color: "#cbd5e1", fontSize: 12.5 }}>{d}</span></div>)}
    </DC>
    <DC title="Protocolo MRL Preoperatorio" accent="#0284c7">
      <ol style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.8, margin: 0, paddingLeft: 18 }}><li>MRL con gadolinio a Radiología</li><li>Discusión conjunta Cirugía Plástica + Radiología</li><li>Mapear vasos funcionales, obstrucciones, venas</li><li>Definir sitios de incisión y anastomosis</li><li>Correlacionar con ICG intraoperatoria (éxito &gt;90%)</li></ol>
      <div style={{ marginTop: 10, padding: 10, borderRadius: 7, background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.12)" }}><p style={{ color: "#7dd3fc", fontSize: 12, margin: 0 }}>📌 CE-MRL + ICG combinados detectan más vasos que ICG sola (estudio 2023-2024, 35 pacientes). MRL es GPS para la cirugía linfática.</p></div>
    </DC>
    <DC title="Tecnología emergente" accent="#6366f1">
      <p style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.7, margin: 0 }}>🤖 Cirugía robótica (sistema MUSA): primeros ensayos clínicos en humanos para ALV. Promete mejorar la precisión en supermicrocirugía donde la destreza humana tiene limitaciones.</p>
    </DC>
    <DC title="Checklist Preoperatorio" accent="#ea580c">
      {[["a","TDC ≥ 3 meses (salvo urgencia)"],["b","IMC ≤ 35"],["c","HbA1c < 7.5% (diabéticos)"],["d","Sin tabaco ≥ 4 semanas"],["e","Comorbilidades optimizadas"],["f","MRL interpretada"],["g","Plan quirúrgico definido"],["h","TDC preop ≥ 1 mes"],["i","Consentimiento informado"]].map(([k,l]) => <DCk key={k} label={l} checked={!!pc[k]} onChange={() => t(k)} />)}
      {Object.keys(pc).length === 9 && Object.values(pc).every(Boolean) && <div style={{ marginTop: 10, padding: 10, borderRadius: 7, background: "rgba(22,163,74,0.08)" }}><p style={{ color: "#16a34a", margin: 0, fontWeight: 700, fontSize: 12.5 }}>✓ Paciente apto para cirugía</p></div>}
    </DC>
  </div>;
}

function DFU() { const [ac, setAc] = useState(null); const ctrls = [["s1","Sem 1","#dc2626",["Heridas","Vendaje inelástico","Circometría basal"]],["s2","Sem 2","#ea580c",["Cicatrización","Ajuste compresión"]],["m1","Mes 1","#ca8a04",["Reinicio TDC","Circometría","VAS"]],["m3","Mes 3","#0d9488",["Circometría+UEL/LEL+LYMQOL","Comparar basal"]],["m8","Mes 8","#0284c7",["Evaluación respuesta","Fotodocumentación"]],["m12","Mes 12","#8b5cf6",["Todo + Lymph-ICF","Decisión largo plazo","MRL a 12m si reintervención"]]]; return <div><DC title="Timeline Posoperatorio"><div style={{ position: "relative", paddingLeft: 20 }}><div style={{ position: "absolute", left: 8, top: 0, bottom: 0, width: 2, background: "rgba(100,116,139,0.15)" }} />{ctrls.map(([id, time, color, items]) => <div key={id} onClick={() => setAc(ac===id?null:id)} style={{ position: "relative", marginBottom: 12, cursor: "pointer" }}><div style={{ position: "absolute", left: -16, top: 5, width: 12, height: 12, borderRadius: "50%", background: color, border: "2px solid rgba(15,23,42,0.8)", zIndex: 1 }} /><div style={{ padding: "10px 14px", borderRadius: 8, background: ac===id?`${color}10`:"rgba(30,41,59,0.4)", border: `1px solid ${ac===id?`${color}44`:"rgba(100,116,139,0.08)"}`, marginLeft: 6 }}><div style={{ fontWeight: 700, color, fontSize: 13, marginBottom: ac===id?6:0 }}>{time}</div>{ac===id && items.map((it, i) => <div key={i} style={{ display: "flex", gap: 6, marginBottom: 2 }}><span style={{ color, fontSize: 7, marginTop: 5 }}>●</span><span style={{ color: "#cbd5e1", fontSize: 12 }}>{it}</span></div>)}</div></div>)}</div></DC><DC title="Compresión Posoperatoria">{[["0-3m: Vendaje 24h/día","#dc2626"],["3-6m: Compresión 12h/día","#ca8a04"],[">6m: Según necesidad","#16a34a"]].map(([t,c], i) => <div key={i} style={{ padding: "8px 12px", borderRadius: 7, marginBottom: 6, background: "rgba(30,41,59,0.4)", borderLeft: `3px solid ${c}` }}><span style={{ color: "#e2e8f0", fontSize: 12.5 }}>{t}</span></div>)}</DC><DC title="Decisión 12 Meses">{[{ l: "Buena respuesta", d: "Sostenida", a: "Continuar TDC + compresión", c: "#16a34a" },{ l: "Adiposo residual", d: "Sin fóvea", a: "Liposucción subunidad", c: "#8b5cf6" },{ l: "Parcial", d: "Vasos residuales", a: "Nueva MRL → ALV/TLV", c: "#ca8a04" },{ l: "Progresión", d: "Fibrosis", a: "Charles modificada", c: "#dc2626" }].map((o, i) => <div key={i} style={{ padding: "12px 14px", borderRadius: 8, marginBottom: 8, background: "rgba(30,41,59,0.4)", border: `1px solid ${o.c}22` }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}><span style={{ color: o.c, fontWeight: 700, fontSize: 13 }}>{o.l}</span><Bdg t={o.d} c={o.c} /></div><p style={{ color: "#94a3b8", fontSize: 12, margin: "4px 0 0" }}>→ {o.a}</p></div>)}</DC></div>; }

function DBlog({ user }) {
  const [posts, setPosts] = useState(getBlogPosts);
  const [view, setView] = useState("list");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title:"", excerpt:"", content:"", category:"Educación", tags:"" });
  const cats = ["Educación","Autocuidado","Investigación","Noticias","Experiencias"];
  const inp = { width:"100%", padding:"10px 14px", borderRadius:8, border:"1px solid rgba(100,116,139,0.2)", background:"rgba(30,41,59,0.8)", color:"#e2e8f0", fontSize:14, fontFamily:F.b, boxSizing:"border-box" };
  const save = (published) => {
    const tags = form.tags.split(",").map(t=>t.trim()).filter(Boolean);
    let updated;
    if (editing) { updated = posts.map(p => p.id===editing ? {...p,...form,tags,published} : p); }
    else { const np = { id:Date.now().toString(),...form,tags,author:user.name,authorId:user.id,date:new Date().toISOString().split("T")[0],published }; updated = [np,...posts]; }
    setPosts(updated); saveBlogPosts(updated); setView("list"); setEditing(null); setForm({title:"",excerpt:"",content:"",category:"Educación",tags:""});
  };
  const del = id => { if (!window.confirm("¿Eliminar este artículo?")) return; const u = posts.filter(p=>p.id!==id); setPosts(u); saveBlogPosts(u); };
  const startEdit = post => { setForm({title:post.title,excerpt:post.excerpt,content:post.content,category:post.category,tags:(post.tags||[]).join(", ")}); setEditing(post.id); setView("edit"); };

  if (view==="new" || view==="edit") return <div>
    <button onClick={() => { setView("list"); setEditing(null); setForm({title:"",excerpt:"",content:"",category:"Educación",tags:""}); }} style={{ background:"none",border:"none",color:D.ac,fontSize:13,cursor:"pointer",marginBottom:16,padding:0,fontFamily:F.b }}>← Volver</button>
    <DC title={editing?"Editar artículo":"Nuevo artículo"} accent={D.ac}>
      <div style={{ marginBottom:12 }}><label style={{ color:"#94a3b8",fontSize:12,display:"block",marginBottom:5 }}>Título</label><input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} style={inp} /></div>
      <div style={{ marginBottom:12 }}><label style={{ color:"#94a3b8",fontSize:12,display:"block",marginBottom:5 }}>Resumen breve</label><textarea value={form.excerpt} onChange={e=>setForm(f=>({...f,excerpt:e.target.value}))} rows={2} style={{...inp,resize:"vertical"}} /></div>
      <div style={{ marginBottom:12 }}><label style={{ color:"#94a3b8",fontSize:12,display:"block",marginBottom:5 }}>Contenido completo (use **Título** para subtítulos y "- item" para listas)</label><textarea value={form.content} onChange={e=>setForm(f=>({...f,content:e.target.value}))} rows={12} style={{...inp,resize:"vertical"}} /></div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12 }}>
        <div><label style={{ color:"#94a3b8",fontSize:12,display:"block",marginBottom:5 }}>Categoría</label><select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} style={{...inp,width:"100%"}}>{cats.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
        <div><label style={{ color:"#94a3b8",fontSize:12,display:"block",marginBottom:5 }}>Etiquetas (separadas por coma)</label><input value={form.tags} onChange={e=>setForm(f=>({...f,tags:e.target.value}))} placeholder="ej: ejercicio, TDC" style={inp} /></div>
      </div>
      <div style={{ display:"flex",gap:8 }}>
        <button onClick={()=>save(false)} style={{ flex:1,padding:10,borderRadius:8,border:"1px solid rgba(100,116,139,0.2)",background:"rgba(30,41,59,0.8)",color:"#94a3b8",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:F.b }}>Guardar borrador</button>
        <button onClick={()=>save(true)} style={{ flex:2,padding:10,borderRadius:8,border:"none",background:"linear-gradient(135deg,#1a7a6d,#0f5a50)",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:F.b }}>Publicar</button>
      </div>
    </DC>
  </div>;

  return <div>
    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
      <div><h3 style={{ margin:0,color:"#e0f2fe",fontSize:16,fontFamily:F.b }}>Gestión del Blog</h3><p style={{ margin:"3px 0 0",color:"#475569",fontSize:12 }}>{posts.length} artículo(s) · {posts.filter(p=>p.published).length} publicado(s)</p></div>
      <button onClick={()=>setView("new")} style={{ padding:"9px 18px",borderRadius:8,border:"none",background:"linear-gradient(135deg,#1a7a6d,#0f5a50)",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:F.b }}>+ Nuevo artículo</button>
    </div>
    {posts.length===0 && <DC><p style={{ color:"#475569",textAlign:"center",fontSize:14,margin:0 }}>No hay artículos aún. Cree el primero.</p></DC>}
    {posts.map(post => <DC key={post.id} accent={post.published?"#16a34a":"#ca8a04"}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12 }}>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex",gap:6,alignItems:"center",marginBottom:6 }}><Bdg t={post.category} c={D.ac} /><Bdg t={post.published?"Publicado":"Borrador"} c={post.published?"#16a34a":"#ca8a04"} /><span style={{ color:"#475569",fontSize:11 }}>{post.date}</span></div>
          <h4 style={{ margin:"0 0 4px",color:"#e2e8f0",fontSize:14,fontFamily:F.b }}>{post.title}</h4>
          <p style={{ margin:0,color:"#64748b",fontSize:12,lineHeight:1.5 }}>{post.excerpt}</p>
        </div>
        <div style={{ display:"flex",gap:6,flexShrink:0 }}>
          <button onClick={()=>startEdit(post)} style={{ padding:"5px 10px",borderRadius:6,border:"1px solid rgba(100,116,139,0.2)",background:"rgba(30,41,59,0.6)",color:"#94a3b8",fontSize:11,cursor:"pointer" }}>Editar</button>
          <button onClick={()=>del(post.id)} style={{ padding:"5px 10px",borderRadius:6,border:"1px solid rgba(220,38,38,0.3)",background:"rgba(220,38,38,0.05)",color:"#f87171",fontSize:11,cursor:"pointer" }}>Borrar</button>
        </div>
      </div>
    </DC>)}
  </div>;
}

function DoctorPortal({ user }) {
  const [tab, setTab] = useState("eval");
  const tabs = { eval: <DEval />, isl: <DISL />, tdc: <DTDC />, calc: <DCalc />, cvrs: <DCVRS />, dec: <DDec />, surg: <DSurg />, fu: <DFU />, blog: <DBlog user={user} /> };
  return <div style={{ minHeight: "100vh", background: D.bg, color: D.tx, fontFamily: F.b, display: "flex" }}>
    <div style={{ width: 190, minHeight: "100vh", background: "rgba(2,6,23,0.95)", borderRight: `1px solid ${D.bdr}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "20px 14px 16px", borderBottom: `1px solid ${D.bdr}` }}><div style={{ fontSize: 9, letterSpacing: "0.12em", color: "#475569", fontWeight: 700, fontFamily: F.m }}>CLÍNICA REINA SOFÍA</div><h2 style={{ margin: "5px 0 0", fontSize: 14, fontWeight: 700, color: D.ac, fontFamily: F.d }}>Protocolo Linfedema</h2><p style={{ margin: "2px 0 0", fontSize: 10, color: "#475569" }}>v4.0 — Evidencia 2024-2025</p></div>
      <nav style={{ flex: 1, padding: "8px 5px" }}>{DTABS.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ display: "flex", alignItems: "center", gap: 7, width: "100%", padding: "8px 9px", borderRadius: 7, border: "none", background: tab===t.id?"rgba(45,212,191,0.1)":"transparent", color: tab===t.id?D.ac:"#64748b", cursor: "pointer", fontSize: 12, fontWeight: tab===t.id?700:500, textAlign: "left", marginBottom: 1, fontFamily: F.b, borderLeft: tab===t.id?"3px solid "+D.ac:"3px solid transparent" }}><span style={{ fontSize: 13 }}>{t.i}</span><span>{t.l}</span></button>)}</nav>
    </div>
    <div style={{ flex: 1, padding: "26px 30px", maxWidth: 760, overflowY: "auto" }}>
      <h2 style={{ margin: "0 0 3px", fontSize: 19, color: "#e0f2fe", fontFamily: F.d }}>{DTABS.find(t => t.id===tab)?.l}</h2>
      <p style={{ color: "#475569", fontSize: 11.5, margin: "0 0 16px" }}>Portal Médico — Protocolo basado en evidencia</p>
      {tabs[tab]}
    </div>
  </div>;
}

/* ════════════════════════════════════════════════════════════════
   MAIN APP
   ════════════════════════════════════════════════════════════════ */
export default function App() {
  const [user, setUser] = useState(() => getCurrentUser());
  const [portal, setPortal] = useState(null);
  const [screen, setScreen] = useState("login");

  const handleLogin = u => { setUser(u); setPortal(u.role === "patient" ? "patient" : null); };
  const handleLogout = () => { clearCurrentUser(); setUser(null); setPortal(null); setScreen("login"); };

  if (!user) {
    if (screen === "register") return <RegisterScreen onBack={() => setScreen("login")} onRegistered={handleLogin} />;
    return <LoginScreen onLogin={handleLogin} onRegister={() => setScreen("register")} />;
  }

  if (portal === "patient") return <div>
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(250,248,245,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e8e2d9", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 22px" }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: P.ac, fontFamily: F.b }}>Linfedema — Portal Pacientes</span>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ fontSize: 12, color: P.txM, fontFamily: F.b }}>Hola, {user.name.split(" ")[0]}</span>
        {user.role === "doctor" && <button onClick={() => setPortal("doctor")} style={{ background: "none", border: "1px solid #e8e2d9", borderRadius: 6, color: P.txM, fontSize: 11, cursor: "pointer", padding: "4px 10px", fontFamily: F.b }}>Portal médico</button>}
        <button onClick={() => setPortal(null)} style={{ background: "none", border: "1px solid #e8e2d9", borderRadius: 6, color: P.txM, fontSize: 11, cursor: "pointer", padding: "4px 10px", fontFamily: F.b }}>Inicio</button>
        <button onClick={handleLogout} style={{ background: "none", border: "1px solid #fecaca", borderRadius: 6, color: "#ef4444", fontSize: 11, cursor: "pointer", padding: "4px 10px", fontFamily: F.b }}>Salir</button>
      </div>
    </div>
    <div style={{ paddingTop: 44 }}><PatientPortal user={user} /></div>
  </div>;

  if (portal === "doctor") return <div>
    <div style={{ position: "fixed", top: 0, left: 190, right: 0, zIndex: 100, background: "rgba(2,6,23,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${D.bdr}`, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 22px" }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: D.ac, fontFamily: F.b }}>Protocolo Linfedema — Portal Médico</span>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "#475569", fontFamily: F.b }}>{user.name}</span>
        <button onClick={() => setPortal("patient")} style={{ background: "none", border: `1px solid ${D.bdr}`, borderRadius: 6, color: "#64748b", fontSize: 11, cursor: "pointer", padding: "4px 10px", fontFamily: F.b }}>Portal paciente</button>
        <button onClick={() => setPortal(null)} style={{ background: "none", border: `1px solid ${D.bdr}`, borderRadius: 6, color: "#64748b", fontSize: 11, cursor: "pointer", padding: "4px 10px", fontFamily: F.b }}>Inicio</button>
        <button onClick={handleLogout} style={{ background: "none", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 6, color: "#f87171", fontSize: 11, cursor: "pointer", padding: "4px 10px", fontFamily: F.b }}>Salir</button>
      </div>
    </div>
    <div style={{ paddingTop: 40 }}><DoctorPortal user={user} /></div>
  </div>;

  return <div style={{ minHeight: "100vh", background: "#0c1117", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.b, position: "relative", overflow: "hidden" }}>
    <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Source+Sans+3:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;700;800&display=swap" rel="stylesheet" />
    <div style={{ position: "absolute", top: "20%", left: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(26,122,109,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
    <div style={{ textAlign: "center", maxWidth: 680, padding: 36 }}>
      <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", fontWeight: 700, margin: "0 0 14px", fontFamily: F.m }}>CLÍNICAS COLSANITAS · CLÍNICA REINA SOFÍA</p>
      <h1 style={{ fontSize: 40, color: "#fff", margin: "0 0 10px", fontFamily: F.d, lineHeight: 1.2 }}>Programa de<br /><span style={{ color: D.ac }}>Linfedema</span></h1>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", margin: "0 0 16px", lineHeight: 1.7 }}>Manejo integral con protocolo de linfangiorresonancia magnética y ruta conservador–quirúrgica</p>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", margin: "0 0 36px" }}>Bienvenido/a, {user.name}</p>
      <div style={{ display: "grid", gridTemplateColumns: user.role==="doctor"?"1fr 1fr":"1fr", gap: 18, maxWidth: user.role==="doctor"?560:320, margin: "0 auto" }}>
        <div onClick={() => setPortal("patient")} style={{ background: "linear-gradient(135deg,rgba(26,122,109,0.15) 0%,rgba(26,122,109,0.05) 100%)", border: "1px solid rgba(26,122,109,0.3)", borderRadius: 20, padding: "36px 26px", cursor: "pointer", transition: "all 0.3s" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "#1a7a6d"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "rgba(26,122,109,0.3)"; }}>
          <div style={{ fontSize: 44, marginBottom: 14 }}>🫂</div>
          <h2 style={{ fontSize: 20, color: "#fff", margin: "0 0 8px", fontFamily: F.d }}>Portal Pacientes</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>Educación, autocuidado, ejercicio, bienestar emocional, calidad de vida y señales de alarma</p>
        </div>
        {user.role === "doctor" && <div onClick={() => setPortal("doctor")} style={{ background: "linear-gradient(135deg,rgba(45,212,191,0.1) 0%,rgba(45,212,191,0.03) 100%)", border: "1px solid rgba(45,212,191,0.25)", borderRadius: 20, padding: "36px 26px", cursor: "pointer", transition: "all 0.3s" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = D.ac; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "rgba(45,212,191,0.25)"; }}>
          <div style={{ fontSize: 44, marginBottom: 14 }}>⚕️</div>
          <h2 style={{ fontSize: 20, color: "#fff", margin: "0 0 8px", fontFamily: F.d }}>Portal Médico</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>Protocolo completo: ISL, TDC, UEL/LEL, LYMQOL, Lymph-ICF, MRL, N-LVA 2024, LYMPHA, cirugía robótica</p>
        </div>}
      </div>
      <button onClick={handleLogout} style={{ marginTop: 28, background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "rgba(255,255,255,0.3)", fontSize: 12, cursor: "pointer", padding: "7px 16px", fontFamily: F.b }}>Cerrar sesión</button>
      <p style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", marginTop: 20 }}>Protocolo basado en evidencia · v4.0 · Actualizado con datos 2024-2025</p>
    </div>
  </div>;
}
