import * as admin from 'firebase-admin';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : undefined;

if (!admin.apps.length) {
  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    // Inicialização para ambiente local (emulador) ou sem credenciais explícitas
    console.warn("Firebase Admin SDK: Service account key not found. Initializing without credentials.");
    admin.initializeApp();
  }
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
