import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase-config";
import { Auth } from "firebase/auth";
import { IAuth, Login, Register } from "@/domain/auth";
import { User } from "@/domain/user";

export class FirebaseAuth implements IAuth {
  async register(data: Register) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth as Auth,
        data.email,
        data.password
      );
      if (userCredential.user.email) {
        return new User(userCredential.user.email);
      }
      throw new Error("User email not found");
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async login(data: Login) {
    if (!auth) {
      throw new Error("Firebase Auth not initialized");
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth as Auth,
        data.email,
        data.password
      );

      if (!userCredential.user.email) throw new Error("User email not found");
      return new User(userCredential.user.email);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async logout() {
    if (!auth) {
      throw new Error("Firebase Auth not initialized");
    }

    try {
      await signOut(auth as Auth);
    } catch (error) {
      throw error;
    }
  }

  async getToken() {
    if (!auth) {
      throw new Error("Firebase Auth not initialized");
    }
    return auth.currentUser?.getIdToken();
  }

  async getAuthUser() {
    if (!auth) {
      throw new Error("Firebase Auth not initialized");
    }
    return auth.currentUser ? new User(auth.currentUser.email as string) : null;
  }
}
