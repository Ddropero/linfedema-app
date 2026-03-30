import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

/**
 * Hook de autenticacion Firebase.
 * Escucha cambios de sesion y carga el perfil del usuario desde Firestore.
 * Retorna { user, userProfile, loading, error }
 */
export default function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          setUser(firebaseUser);
          // Cargar perfil desde Firestore
          const profileRef = doc(db, "users", firebaseUser.uid);
          const profileSnap = await getDoc(profileRef);
          if (profileSnap.exists()) {
            const data = profileSnap.data();
            setUserProfile({
              name: data.name || "",
              email: data.email || firebaseUser.email,
              role: data.role || "patient",
              approved: data.approved ?? false,
              totpEnabled: data.totpEnabled ?? false,
              totpSecret: data.totpSecret || null,
              registroMedico: data.registroMedico || null,
              devices: data.devices || [],
              createdAt: data.createdAt || null,
            });
          } else {
            setUserProfile(null);
            setError("Perfil de usuario no encontrado en la base de datos.");
          }
        } else {
          setUser(null);
          setUserProfile(null);
        }
      } catch (err) {
        console.error("Error al cargar perfil de usuario:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, userProfile, loading, error };
}
