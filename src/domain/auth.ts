import { FirebaseAuth } from "@/services/firebase/auth-firebase";
import { IUser } from "./user";

export type Login = {
  email: string;
  password: string;
};

export type Register = Login;

export interface IAuth {
  register: (data: Register) => Promise<IUser>;
  login: (data: Login) => Promise<IUser>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | undefined>;
  getAuthUser: () => Promise<IUser | null>;
}

export const getAuth = () => {
  return new FirebaseAuth();
};

export class Auth {
  static async login(data: Login) {
    return getAuth().login(data);
  }

  static async register(data: Register) {
    return getAuth().register(data);
  }

  static async logout() {
    return getAuth().logout();
  }

  static async getToken() {
    return getAuth().getToken();
  }

  static async getAuthUser() {
    return getAuth().getAuthUser();
  }

  static async loginWithGoogle() {
    return getAuth().loginWithGoogle();
  }
}
