import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { env } from "@/configuration/environments";

const app = !getApps().length ? initializeApp(env.firebaseConfig) : getApp();

const auth = getAuth(app);

export { app, auth };
