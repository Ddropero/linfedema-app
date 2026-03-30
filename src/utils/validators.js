// Colombian document validators
export function validateDocument(type, number) {
  if (!number || !number.trim()) return "Número de documento requerido";
  const n = number.trim();
  switch (type) {
    case "CC": return /^\d{6,10}$/.test(n) ? null : "CC debe tener 6-10 dígitos";
    case "CE": return /^\d{6,7}$/.test(n) ? null : "CE debe tener 6-7 dígitos";
    case "TI": return /^\d{10,11}$/.test(n) ? null : "TI debe tener 10-11 dígitos";
    case "PP": return /^[A-Za-z0-9]{5,20}$/.test(n) ? null : "Pasaporte: 5-20 caracteres alfanuméricos";
    case "RC": return /^\d{10,11}$/.test(n) ? null : "RC debe tener 10-11 dígitos";
    default: return "Tipo de documento no válido";
  }
}

export function validatePhone(phone) {
  if (!phone || !phone.trim()) return "Teléfono requerido";
  const p = phone.trim().replace(/\s/g, "");
  if (/^3\d{9}$/.test(p)) return null; // mobile
  if (/^60\d{8}$/.test(p)) return null; // landline
  return "Teléfono colombiano: 10 dígitos (3xx... o 60x...)";
}

export function validateEmail(email) {
  if (!email || !email.trim()) return "Email requerido";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? null : "Email no válido";
}

export const DEPARTAMENTOS_CO = [
  "Amazonas","Antioquia","Arauca","Atlántico","Bogotá D.C.","Bolívar","Boyacá","Caldas",
  "Caquetá","Casanare","Cauca","Cesar","Chocó","Córdoba","Cundinamarca","Guainía",
  "Guaviare","Huila","La Guajira","Magdalena","Meta","Nariño","Norte de Santander",
  "Putumayo","Quindío","Risaralda","San Andrés","Santander","Sucre","Tolima",
  "Valle del Cauca","Vaupés","Vichada"
];

export const TIPOS_DOCUMENTO = [
  { value: "CC", label: "Cédula de Ciudadanía" },
  { value: "CE", label: "Cédula de Extranjería" },
  { value: "TI", label: "Tarjeta de Identidad" },
  { value: "PP", label: "Pasaporte" },
  { value: "RC", label: "Registro Civil" },
];

export const EPS_LIST = [
  "Sura EPS","Nueva EPS","Sanitas","Salud Total","Compensar","Famisanar",
  "Coomeva","SOS EPS","Mutual Ser","Aliansalud","Comfenalco Valle",
  "Emssanar","Coosalud","Capital Salud","Medimás","Otra"
];
