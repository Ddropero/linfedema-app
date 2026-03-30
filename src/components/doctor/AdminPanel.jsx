import { useState, useEffect } from "react";
import { collection, query, where, getDocs, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { F, D } from "../../styles/palette";
import { DC } from "../shared";

export default function AdminPanel({ user }) {
  const [pending, setPending] = useState([]);
  const [all, setAll] = useState([]);
  const [tab, setTab] = useState("pending");
  const [loading, setLoading] = useState(true);

  const loadDoctors = async () => {
    setLoading(true);
    try {
      const q1 = query(collection(db, "users"), where("role", "==", "doctor"), where("approved", "==", false));
      const q2 = query(collection(db, "users"), where("role", "==", "doctor"), where("approved", "==", true));
      const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);
      setPending(snap1.docs.map(d => ({ id: d.id, ...d.data() })));
      setAll(snap2.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) { console.error("Error loading doctors:", e); }
    setLoading(false);
  };

  useEffect(() => { loadDoctors(); }, []);

  const approve = async (docId) => {
    await updateDoc(doc(db, "users", docId), { approved: true, approvedBy: user.uid, approvedAt: serverTimestamp() });
    loadDoctors();
  };

  const revoke = async (docId) => {
    await updateDoc(doc(db, "users", docId), { approved: false, revokedBy: user.uid, revokedAt: serverTimestamp() });
    loadDoctors();
  };

  const btnStyle = (active) => ({
    padding: "8px 16px", borderRadius: 8, border: `2px solid ${active ? D.ac : "rgba(100,116,139,0.12)"}`,
    background: active ? "rgba(45,212,191,0.1)" : "transparent", color: active ? D.ac : "#64748b",
    fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: F.b
  });

  return <div>
    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <button onClick={() => setTab("pending")} style={btnStyle(tab === "pending")}>
        Pendientes {pending.length > 0 && <span style={{ background: "#dc2626", color: "#fff", borderRadius: 10, padding: "1px 7px", fontSize: 11, marginLeft: 6 }}>{pending.length}</span>}
      </button>
      <button onClick={() => setTab("approved")} style={btnStyle(tab === "approved")}>Aprobados ({all.length})</button>
    </div>

    {loading && <DC><p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>Cargando...</p></DC>}

    {!loading && tab === "pending" && (pending.length === 0
      ? <DC><p style={{ color: "#64748b", fontSize: 14, margin: 0, textAlign: "center" }}>No hay solicitudes pendientes</p></DC>
      : pending.map(d => <DC key={d.id} accent="#ca8a04">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h4 style={{ margin: "0 0 4px", color: "#e2e8f0", fontSize: 14, fontFamily: F.b }}>{d.name}</h4>
              <p style={{ margin: "0 0 2px", color: "#64748b", fontSize: 12 }}>{d.email}</p>
              {d.registroMedico && <p style={{ margin: 0, color: "#94a3b8", fontSize: 11, fontFamily: F.m }}>RM: {d.registroMedico}</p>}
              <p style={{ margin: "4px 0 0", color: "#475569", fontSize: 11 }}>Registrado: {d.createdAt?.toDate?.()?.toLocaleDateString("es-CO") || "N/A"}</p>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => approve(d.id)} style={{ padding: "6px 14px", borderRadius: 6, border: "none", background: "#16a34a", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Aprobar</button>
              <button onClick={() => revoke(d.id)} style={{ padding: "6px 14px", borderRadius: 6, border: "1px solid rgba(220,38,38,0.3)", background: "transparent", color: "#f87171", fontSize: 12, cursor: "pointer" }}>Rechazar</button>
            </div>
          </div>
        </DC>)
    )}

    {!loading && tab === "approved" && (all.length === 0
      ? <DC><p style={{ color: "#64748b", fontSize: 14, margin: 0, textAlign: "center" }}>No hay médicos aprobados</p></DC>
      : all.map(d => <DC key={d.id} accent="#16a34a">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h4 style={{ margin: "0 0 4px", color: "#e2e8f0", fontSize: 14, fontFamily: F.b }}>{d.name}</h4>
              <p style={{ margin: "0 0 2px", color: "#64748b", fontSize: 12 }}>{d.email}</p>
              {d.registroMedico && <p style={{ margin: 0, color: "#94a3b8", fontSize: 11, fontFamily: F.m }}>RM: {d.registroMedico}</p>}
            </div>
            <button onClick={() => revoke(d.id)} style={{ padding: "6px 14px", borderRadius: 6, border: "1px solid rgba(220,38,38,0.3)", background: "transparent", color: "#f87171", fontSize: 12, cursor: "pointer" }}>Revocar</button>
          </div>
        </DC>)
    )}
  </div>;
}
