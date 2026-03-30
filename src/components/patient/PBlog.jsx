import { useState } from "react";
import { F, P } from "../../styles/palette";
import { Bdg, PC, PBack } from "../shared";
import { getBlogPosts } from "../../utils/blogStorage";

export default function PBlog({ nav }) {
  const [posts] = useState(() => getBlogPosts().filter(p => p.published));
  const [cat, setCat] = useState("Todas");
  const cats = ["Todas","Educación","Autocuidado","Investigación","Noticias","Experiencias"];
  const catColors = { "Educación":"#0284c7","Autocuidado":"#0d9488","Investigación":"#8b5cf6","Noticias":"#ca8a04","Experiencias":"#ea580c" };
  const filtered = cat === "Todas" ? posts : posts.filter(p => p.category === cat);
  return <div><PBack nav={nav} />
    <h2 style={{ fontSize: 24, color: P.tx, margin: "0 0 6px", fontFamily: F.d }}>Blog de Linfedema</h2>
    <p style={{ color: P.txM, fontSize: 14, margin: "0 0 20px" }}>Artículos, consejos y novedades del equipo del Dr. David Duque</p>
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
