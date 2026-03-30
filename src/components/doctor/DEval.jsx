import { useState } from "react";
import { DC, DCk } from "../shared";

export default function DEval() {
  const [c, setC] = useState({});
  const t = k => setC(p => ({...p,[k]:!p[k]}));
  return <div>
    <DC title="Anamnesis">{[["pri","Linfedema primario (familiares/personales)"],["onc","Hx oncol\u00f3gica (cirug\u00eda, linfadenectom\u00eda, RT)"],["tra","Trauma / infecciones / filariasis"],["obe","Obesidad y comorbilidades"],["sym","S\u00edntomas (dolor, pesadez, infecciones)"]].map(([k,l]) => <DCk key={k} label={l} checked={!!c[k]} onChange={() => t(k)} />)}</DC>
    <DC title="Examen F\u00edsico">{[["cir","Circometr\u00eda bilateral (prenda retirada \u226524h)"],["fov","F\u00f3vea (pitting)"],["ste","Signo de Stemmer"],["ski","Cambios cut\u00e1neos"],["inf","Complicaciones activas"],["pho","Documentaci\u00f3n fotogr\u00e1fica"]].map(([k,l]) => <DCk key={k} label={l} checked={!!c[k]} onChange={() => t(k)} />)}</DC>
    <DC title="Im\u00e1genes" accent="#0284c7"><DCk label="Doppler venoso \u2014 descartar TVP/IVC" checked={!!c.dop} onChange={() => t("dop")} /><p style={{ color: "#64748b", fontSize: 11, fontStyle: "italic", margin: "5px 0 0" }}>* MRL a los 3 meses si indicaci\u00f3n quir\u00fargica.</p></DC>
  </div>;
}
