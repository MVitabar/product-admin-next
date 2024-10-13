/* eslint-disable @typescript-eslint/no-explicit-any */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSivLErFKbd5WRq_aBQ-NsfwFZ5kWr_LU",
  authDomain: "aura-8f6f6.firebaseapp.com",
  projectId: "aura-8f6f6",
  storageBucket: "aura-8f6f6.appspot.com",
  messagingSenderId: "470599673665",
  appId: "1:470599673665:web:5c91fb82621997ef1de3c0",
};
import {
  getStorage,
  uploadString,
  getDownloadURL,
  ref,
} from "firebase/storage";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

// =========Crear Usuario=========

export const createUser = async (user: { email: string; password: string }) => {
  return await createUserWithEmailAndPassword(auth, user.email, user.password);
};

// =========Iniciar Sesion=========

export const signIn = async (user: { email: string; password: string }) => {
  return await signInWithEmailAndPassword(auth, user.email, user.password);
};

// =========Actualizar Perfil=========
export const updateUser = (user: {
  displayName: string | null | undefined;
  photoURL?: string | null | undefined;
}) => {
  if (auth.currentUser) return updateProfile(auth.currentUser, user);
};

export const sendResetEmail = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

//====Cierre de sesion=====
export const signOutAccount = () => {
  localStorage.removeItem("user");
  return auth.signOut();
};

//====db funciones=====
export const getDocument = async (path: string) => {
  return (await getDoc(doc(db, path))).data();
};

export const setDocument = (path: string, data: any) => {
  data.createdAt = serverTimestamp();
  return setDoc(doc(db, path), data);
};

export const updateDocument = (path: string, data: any) => {
  return updateDoc(doc(db, path), data);
};

//==== Funciones de almacenamiento ====

//====Subir un archivo en base64 y obtener su url para usar despues ====
export const uploadBase64 = async (path: string, base64: string) => {
  return uploadString(ref(storage, path), base64, "data_url").then(() => {
    return getDownloadURL(ref(storage, path));
  });
};
