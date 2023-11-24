import type { FastifyReply, FastifyRequest } from "fastify";
import { ControllerBase } from "./controller-base";
import { UsersService } from "@/services/users-service";
import { SignInDto, SignUpDto } from "@/dtos/auth-dtos";
import { AuthService } from "@/services/auth-service";

export class AuthController extends ControllerBase {
  constructor(private usersService: UsersService) {
    super();
  }

  async signUp({ name, email, password }: SignUpDto) {
    const userAlreadyExists = await this.usersService.findByEmail(email);

    if (userAlreadyExists) {
      return this.badRequest({ message: "E-mail already exists" });
    }

    const user = await this.usersService.create({
      name,
      email,
      password,
    });

    return this.ok(user);
  }

  async signIn({ email, password }: SignInDto) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return this.badRequest({ message: "E-mail not exists" });
    }

    const isSame = this.usersService.checkPassword(password, user.password);

    if (!isSame) {
      return this.unauthorized({ message: "Incorrect password" });
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const expiresIn = 60 * 60 * 24 * 7; // 7 days

    const token = AuthService.sign(payload, expiresIn);

    return this.ok({ authenticated: true, ...payload, token });
  }
}
