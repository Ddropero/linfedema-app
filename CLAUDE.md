# CLAUDE.md — Contexto del Proyecto

## Qué es este proyecto
Plataforma clínica de manejo integral del linfedema — Dr. David Duque. Tiene dos portales:
- **Portal Pacientes**: tema claro/cálido, lenguaje accesible, educación y autocuidado
- **Portal Médicos**: tema oscuro/profesional, protocolo clínico completo con calculadoras

## Stack
- React 18 con **inline styles** (NO usar CSS files, NO usar Tailwind)
- Google Fonts: Libre Baskerville (display), Source Sans 3 (body), JetBrains Mono (datos)
- Todo está en `src/App.jsx` como single-file component
- Outputs van a `/mnt/user-data/outputs/` en formato JSX

## Convenciones de código
- Inline styles exclusivamente, no archivos CSS separados
- Paleta pacientes: fondo `#faf8f5`, acento `#1a7a6d`, texto `#2c2418`
- Paleta médicos: fondo dark gradient `#020617→#0f172a`, acento `#2dd4bf`, texto `#e2e8f0`
- Componentes abreviados por densidad: `PC` = Patient Card, `DC` = Doctor Card, `DCk` = Doctor Checkbox, `NI` = Number Input, `Bdg` = Badge
- Variables de fuentes en objeto `F`, paleta pacientes en `P`, paleta médicos en `D`

## Instrumentos clínicos integrados
- **LYMQOL** (Arm y Leg): escala Likert 1-4, 4 dominios (síntomas, apariencia, función, ánimo)
- **Lymph-ICF**: VAS 0-10, 29 ítems, 5 dominios. Cambio significativo ≥15 puntos
- **Índice UEL/LEL**: volumetría por cono truncado corregida por IMC (Yamamoto)
- **VAS dolor**: 0-10
- **Clasificación ISL**: Estadios 0-III + severidad volumétrica

## Evidencia 2024-2025 integrada
- N-LVA RCT 2024 (Lymph-ICF como outcome primario)
- PAL Trial (ejercicio seguro)
- Consenso ACS/LANA 2023 (viajes, precauciones)
- LYMPHA preventiva (Boccardo 4% vs 13-65%)
- Selección quirúrgica por MRL (Seoul National University)
- CE-MRL + ICG combinados
- Cirugía robótica MUSA (emergente)

## Idioma
Todo el contenido es en **español**. Las respuestas sobre este proyecto deben ser en español.
