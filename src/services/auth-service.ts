import { app } from "@/app";

export class AuthService {
  static verify(token: string) {
    return app.jwt.verify(token);
  }

  static sign(payload: string | Object | Buffer, expiresIn: number) {
    return app.jwt.sign(payload, {
      expiresIn,
    });
  }
}
