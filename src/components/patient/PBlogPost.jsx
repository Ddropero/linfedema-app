import { F, P } from "../../styles/palette";
import { Bdg, PC } from "../shared";
import { getBlogPosts } from "../../utils/blogStorage";

export default function PBlogPost({ nav, postId }) {
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
