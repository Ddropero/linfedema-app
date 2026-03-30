import { generateSecret, generateURI, verifySync } from "otplib";
import QRCode from "qrcode";

const APP_NAME = "Linfedema Dr. David Duque";

export function generateTOTPSecret() {
  return generateSecret();
}

export function getTOTPAuthURL(secret, email) {
  return generateURI({ secret, accountName: email, issuer: APP_NAME, algorithm: "SHA1", digits: 6, period: 30 });
}

export async function generateQRCodeURL(secret, email) {
  const otpauthURL = getTOTPAuthURL(secret, email);
  return QRCode.toDataURL(otpauthURL, { width: 256, margin: 2, color: { dark: "#e2e8f0", light: "#0f172a" } });
}

export function verifyTOTPToken(secret, token) {
  try { return verifySync({ token, secret }); } catch { return false; }
}
