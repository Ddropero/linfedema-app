import React, { useState, useEffect } from "react";
import { F, D } from "../../styles/palette";
import {
  getDeviceId,
  getDevices,
  removeDevice,
} from "../../utils/deviceManager";

export default function DeviceManager({ userId }) {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);
  const [error, setError] = useState("");
  const currentDeviceId = getDeviceId();

  const loadDevices = async () => {
    setLoading(true);
    setError("");
    try {
      const list = await getDevices(userId);
      setDevices(list);
    } catch (err) {
      setError("Error al cargar dispositivos: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) loadDevices();
  }, [userId]);

  const handleRemove = async (deviceId) => {
    if (devices.length <= 1) {
      setError("No puede eliminar el unico dispositivo registrado.");
      return;
    }

    setRemoving(deviceId);
    setError("");
    try {
      await removeDevice(userId, deviceId);
      await loadDevices();
    } catch (err) {
      setError("Error al eliminar dispositivo: " + err.message);
    } finally {
      setRemoving(null);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "---";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const styles = {
    container: {
      fontFamily: F.b,
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    title: {
      fontFamily: F.d,
      color: D.tx,
      fontSize: 18,
      margin: 0,
    },
    badge: {
      background: "rgba(45,212,191,0.12)",
      color: D.ac,
      padding: "4px 10px",
      borderRadius: 12,
      fontSize: 12,
      fontWeight: 600,
    },
    deviceCard: (isCurrent) => ({
      background: isCurrent
        ? "rgba(45,212,191,0.06)"
        : "rgba(255,255,255,0.02)",
      border: `1px solid ${isCurrent ? "rgba(45,212,191,0.25)" : D.bdr}`,
      borderRadius: 10,
      padding: "16px 18px",
      marginBottom: 10,
    }),
    deviceHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    deviceName: {
      color: D.tx,
      fontSize: 15,
      fontWeight: 600,
    },
    currentBadge: {
      background: D.ac,
      color: "#0f172a",
      padding: "2px 8px",
      borderRadius: 8,
      fontSize: 10,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    deviceInfo: {
      color: D.txM,
      fontSize: 12,
      marginBottom: 3,
    },
    removeBtn: {
      background: "rgba(239,68,68,0.1)",
      border: "1px solid rgba(239,68,68,0.25)",
      color: "#fca5a5",
      padding: "6px 14px",
      borderRadius: 6,
      fontSize: 12,
      fontFamily: F.b,
      cursor: "pointer",
      marginTop: 10,
    },
    removeBtnDisabled: {
      background: "rgba(255,255,255,0.03)",
      border: `1px solid ${D.bdr}`,
      color: D.txM,
      padding: "6px 14px",
      borderRadius: 6,
      fontSize: 12,
      fontFamily: F.b,
      cursor: "not-allowed",
      marginTop: 10,
      opacity: 0.5,
    },
    error: {
      background: "rgba(239,68,68,0.12)",
      border: "1px solid rgba(239,68,68,0.3)",
      color: "#fca5a5",
      padding: "10px 14px",
      borderRadius: 8,
      fontSize: 13,
      marginBottom: 16,
    },
    empty: {
      color: D.txM,
      fontSize: 13,
      textAlign: "center",
      padding: 30,
    },
    loading: {
      color: D.txM,
      fontSize: 13,
      textAlign: "center",
      padding: 30,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Dispositivos Certificados</h3>
        <span style={styles.badge}>{devices.length} / 3</span>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {loading ? (
        <div style={styles.loading}>Cargando dispositivos...</div>
      ) : devices.length === 0 ? (
        <div style={styles.empty}>No hay dispositivos registrados.</div>
      ) : (
        devices.map((device) => {
          const isCurrent = device.id === currentDeviceId;
          return (
            <div key={device.id} style={styles.deviceCard(isCurrent)}>
              <div style={styles.deviceHeader}>
                <span style={styles.deviceName}>
                  {device.friendlyName || "Dispositivo"}
                </span>
                {isCurrent && (
                  <span style={styles.currentBadge}>Actual</span>
                )}
              </div>
              <div style={styles.deviceInfo}>
                Navegador: {device.browser || "---"} | SO: {device.os || "---"}
              </div>
              <div style={styles.deviceInfo}>
                Registrado: {formatDate(device.registeredAt)}
              </div>
              <div style={styles.deviceInfo}>
                Ultimo acceso: {formatDate(device.lastLogin)}
              </div>
              {!isCurrent && (
                <button
                  style={
                    devices.length <= 1
                      ? styles.removeBtnDisabled
                      : styles.removeBtn
                  }
                  disabled={devices.length <= 1 || removing === device.id}
                  onClick={() => handleRemove(device.id)}
                >
                  {removing === device.id
                    ? "Eliminando..."
                    : "Eliminar dispositivo"}
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
