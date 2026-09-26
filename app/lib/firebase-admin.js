import { cert, getApps, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

const serviceAccount = {
  projectId:
    process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

export const isFirebaseAdminConfigured = Object.values(serviceAccount).every(Boolean);

const app = isFirebaseAdminConfigured
  ? getApps().length
    ? getApps()[0]
    : initializeApp({ credential: cert(serviceAccount) })
  : null;

export const adminDb = app ? getFirestore(app) : null;
export { FieldValue };
