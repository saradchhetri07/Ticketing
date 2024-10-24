import bcrypt from "bcrypt";

export class Password {
  static async toHash(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  static async comparePasssord(inputPassword: string, storedPassword: string) {
    return await bcrypt.compare(inputPassword, storedPassword);
  }
}
