import { useState } from "react";
import { F, D } from "../../styles/palette";
import { DC, Bdg } from "../shared";
import { getBlogPosts, saveBlogPosts } from "../../utils/blogStorage";

export default function DBlog({ user }) {
  const [posts, setPosts] = useState(getBlogPosts);
  const [view, setView] = useState("list");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title:"", excerpt:"", content:"", category:"Educaci\u00f3n", tags:"" });
  const cats = ["Educaci\u00f3n","Autocuidado","Investigaci\u00f3n","Noticias","Experiencias"];
  const inp = { width:"100%", padding:"10px 14px", borderRadius:8, border:"1px solid rgba(100,116,139,0.2)", background:"rgba(30,41,59,0.8)", color:"#e2e8f0", fontSize:14, fontFamily:F.b, boxSizing:"border-box" };
  const save = (published) => {
    const tags = form.tags.split(",").map(t=>t.trim()).filter(Boolean);
    let updated;
    if (editing) { updated = posts.map(p => p.id===editing ? {...p,...form,tags,published} : p); }
    else { const np = { id:Date.now().toString(),...form,tags,author:user.name,authorId:user.id,date:new Date().toISOString().split("T")[0],published }; updated = [np,...posts]; }
    setPosts(updated); saveBlogPosts(updated); setView("list"); setEditing(null); setForm({title:"",excerpt:"",content:"",category:"Educaci\u00f3n",tags:""});
  };
  const del = id => { if (!window.confirm("\u00bfEliminar este art\u00edculo?")) return; const u = posts.filter(p=>p.id!==id); setPosts(u); saveBlogPosts(u); };
  const startEdit = post => { setForm({title:post.title,excerpt:post.excerpt,content:post.content,category:post.category,tags:(post.tags||[]).join(", ")}); setEditing(post.id); setView("edit"); };

  if (view==="new" || view==="edit") return <div>
    <button onClick={() => { setView("list"); setEditing(null); setForm({title:"",excerpt:"",content:"",category:"Educaci\u00f3n",tags:""}); }} style={{ background:"none",border:"none",color:D.ac,fontSize:13,cursor:"pointer",marginBottom:16,padding:0,fontFamily:F.b }}>{"\u2190"} Volver</button>
    <DC title={editing?"Editar art\u00edculo":"Nuevo art\u00edculo"} accent={D.ac}>
      <div style={{ marginBottom:12 }}><label style={{ color:"#94a3b8",fontSize:12,display:"block",marginBottom:5 }}>T\u00edtulo</label><input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} style={inp} /></div>
      <div style={{ marginBottom:12 }}><label style={{ color:"#94a3b8",fontSize:12,display:"block",marginBottom:5 }}>Resumen breve</label><textarea value={form.excerpt} onChange={e=>setForm(f=>({...f,excerpt:e.target.value}))} rows={2} style={{...inp,resize:"vertical"}} /></div>
      <div style={{ marginBottom:12 }}><label style={{ color:"#94a3b8",fontSize:12,display:"block",marginBottom:5 }}>Contenido completo (use **T\u00edtulo** para subt\u00edtulos y "- item" para listas)</label><textarea value={form.content} onChange={e=>setForm(f=>({...f,content:e.target.value}))} rows={12} style={{...inp,resize:"vertical"}} /></div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12 }}>
        <div><label style={{ color:"#94a3b8",fontSize:12,display:"block",marginBottom:5 }}>Categor\u00eda</label><select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} style={{...inp,width:"100%"}}>{cats.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
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
      <div><h3 style={{ margin:0,color:"#e0f2fe",fontSize:16,fontFamily:F.b }}>Gesti\u00f3n del Blog</h3><p style={{ margin:"3px 0 0",color:"#475569",fontSize:12 }}>{posts.length} art\u00edculo(s) {"\u00b7"} {posts.filter(p=>p.published).length} publicado(s)</p></div>
      <button onClick={()=>setView("new")} style={{ padding:"9px 18px",borderRadius:8,border:"none",background:"linear-gradient(135deg,#1a7a6d,#0f5a50)",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:F.b }}>+ Nuevo art\u00edculo</button>
    </div>
    {posts.length===0 && <DC><p style={{ color:"#475569",textAlign:"center",fontSize:14,margin:0 }}>No hay art\u00edculos a\u00fan. Cree el primero.</p></DC>}
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
