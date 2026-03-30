export default function getSev(a, s) {
  if (s === 4) { if (a <= 1.5) return { t: "Sin afectación", c: "#16a34a" }; if (a <= 2.5) return { t: "Leve", c: "#ca8a04" }; if (a <= 3.25) return { t: "Moderada", c: "#ea580c" }; return { t: "Severa", c: "#dc2626" }; }
  if (a <= 2.5) return { t: "Sin afectación", c: "#16a34a" }; if (a <= 5) return { t: "Leve", c: "#ca8a04" }; if (a <= 7.5) return { t: "Moderada", c: "#ea580c" }; return { t: "Severa", c: "#dc2626" };
}
