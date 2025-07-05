import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./configuration";
import { Auth } from "firebase/auth";
import { IAuth, Login, Register } from "@/app/hooks/useAuth";
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
      console.log(userCredential);

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
}
