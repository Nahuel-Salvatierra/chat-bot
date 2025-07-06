export interface IUser {
  email: string;
}

export class User implements IUser {
  email: string;
  constructor(email: string) {
    this.email = email;
  }
}
