# Linfedema Integral v4.0
## Dr. David Duque — Programa de Linfedema

Protocolo de Manejo Integral del Linfedema con MRL y Ruta Conservador–Quirúrgica.

### Portales

**🫂 Portal Pacientes** (tema claro, cálido)
- ¿Qué es el linfedema? — educación completa
- Guía de autocuidado — 7 secciones (incluyendo viajes ACS/LANA 2023)
- Bienestar emocional — impacto psicosocial, recursos
- Ejercicio seguro — datos PAL Trial, evidencia 2024-2025
- Opciones quirúrgicas — ALV, TLV, LYMPHA explicados para pacientes
- Evaluación de calidad de vida — LYMQOL Arm/Leg interactivo
- Estadios ISL — clasificación en lenguaje accesible
- Preguntas frecuentes — 8 FAQ actualizadas
- Señales de alarma — urgencias y consulta médica

**⚕️ Portal Médicos** (tema oscuro, profesional)
- Evaluación inicial — checklist anamnesis + examen físico
- Clasificación ISL — estadios + severidad volumétrica
- TDC — Fases 1-2, criterios de respuesta a 3 meses
- Calculadoras — Índice UEL/LEL (cono truncado/IMC)
- CVRS — LYMQOL (Arm/Leg, Likert 1-4) + Lymph-ICF (29 ítems, VAS 0-10)
- Decisión 3 meses — Escenarios A/B/C
- Cirugía — ALV, TLV, liposucción, Charles, LYMPHA + datos N-LVA RCT 2024, selección por MRL, cirugía robótica MUSA
- Seguimiento posoperatorio — timeline + compresión + decisión 12 meses

### Stack Técnico
- React 18 con inline styles (sin CSS files ni Tailwind)
- Google Fonts: Libre Baskerville, Source Sans 3, JetBrains Mono
- Single-file component (`src/App.jsx`)

### Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar en desarrollo
npm start

# 3. Build para producción
npm run build
```

### Desarrollo con Claude Code

```bash
# Desde la raíz del proyecto
claude

# Ejemplos de prompts:
# "Separa App.jsx en componentes individuales"
# "Agrega React Router para URLs"
# "Implementa persistencia con localStorage"
# "Agrega exportación PDF de resultados LYMQOL"
# "Agrega autenticación básica para los portales"
```

### Evidencia Integrada
- N-LVA RCT 2024 (92 pacientes, mejora Lymph-ICF)
- PAL Trial (ejercicio seguro en linfedema)
- Consenso ACS/LANA 2023 (precauciones actualizadas)
- MRL + ICG (tasa éxito >90%)
- LYMPHA (Boccardo: 4% incidencia vs 13-65%)
- Seoul National University (selección quirúrgica por MRL)
- Impacto psicosocial (estudios a 10 años)
- Sistema MUSA (cirugía robótica emergente)

### Referencias principales
1. Manrique OJ, et al. Mayo Clin Proc. 2022
2. ISL Consensus. Lymphology. 2020
3. Lee CJ, et al. Front Surg. 2026 (N-LVA review)
4. Kappos EA, et al. Breast Cancer Res Treat. 2025 (LVA vs VLNT)
5. Boccardo F, et al. Microsurgery. 2014 (LYMPHA)
6. ACS/LANA Summit 2023 (risk reduction consensus)
7. Schmitz KH, et al. PAL Trial. 2009
8. Keeley V, et al. LYMQOL. 2010
9. Devoogdt N, et al. Lymph-ICF. 2011

---
Protocolo basado en evidencia · Dr. David Duque · v4.0
