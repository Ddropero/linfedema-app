import {
  doc,
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const DEVICE_ID_KEY = "linfedema_device_id";
const MAX_DEVICES = 3;

/**
 * Obtiene o genera un ID unico para este dispositivo.
 * Se almacena en localStorage para persistencia.
 */
export function getDeviceId() {
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  return deviceId;
}

/**
 * Construye informacion descriptiva del dispositivo actual.
 */
export function getDeviceInfo() {
  const ua = navigator.userAgent;
  let browserName = "Navegador desconocido";
  if (ua.includes("Firefox")) browserName = "Firefox";
  else if (ua.includes("Edg")) browserName = "Edge";
  else if (ua.includes("Chrome")) browserName = "Chrome";
  else if (ua.includes("Safari")) browserName = "Safari";

  let osName = "SO desconocido";
  if (ua.includes("Windows")) osName = "Windows";
  else if (ua.includes("Mac OS")) osName = "macOS";
  else if (ua.includes("Android")) osName = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) osName = "iOS";
  else if (ua.includes("Linux")) osName = "Linux";

  return {
    userAgent: ua,
    browser: browserName,
    os: osName,
    friendlyName: `${browserName} en ${osName}`,
  };
}

/**
 * Registra un dispositivo en la subcoleccion devices del usuario.
 */
export async function registerDevice(userId, deviceId, deviceInfo) {
  const deviceRef = doc(db, "users", userId, "devices", deviceId);
  await setDoc(deviceRef, {
    deviceId,
    browser: deviceInfo.browser || "Desconocido",
    os: deviceInfo.os || "Desconocido",
    userAgent: deviceInfo.userAgent || "",
    friendlyName: deviceInfo.friendlyName || "Dispositivo",
    registeredAt: serverTimestamp(),
    lastLogin: serverTimestamp(),
  });
}

/**
 * Obtiene la lista de dispositivos registrados del usuario.
 */
export async function getDevices(userId) {
  const devicesCol = collection(db, "users", userId, "devices");
  const snapshot = await getDocs(devicesCol);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Elimina un dispositivo de la lista del usuario.
 */
export async function removeDevice(userId, deviceId) {
  const deviceRef = doc(db, "users", userId, "devices", deviceId);
  await deleteDoc(deviceRef);
}

/**
 * Verifica si el dispositivo actual esta certificado para el usuario.
 */
export async function isDeviceCertified(userId, deviceId) {
  const deviceRef = doc(db, "users", userId, "devices", deviceId);
  const snap = await getDoc(deviceRef);
  return snap.exists();
}

/**
 * Verifica si el usuario puede agregar un dispositivo adicional (max 3).
 */
export async function canAddDevice(userId) {
  const devices = await getDevices(userId);
  return devices.length < MAX_DEVICES;
}

/**
 * Actualiza la fecha de ultimo login del dispositivo.
 */
export async function updateLastLogin(userId, deviceId) {
  const deviceRef = doc(db, "users", userId, "devices", deviceId);
  const snap = await getDoc(deviceRef);
  if (snap.exists()) {
    await setDoc(deviceRef, { lastLogin: serverTimestamp() }, { merge: true });
  }
}
