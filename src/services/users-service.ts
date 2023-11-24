import bcrypt from "bcrypt";
import { databaseClient } from "@/config/database-client";
import { SignUpDto } from "@/dtos/auth-dtos";

export class UsersService {
  create({ name, email, password }: SignUpDto) {
    return databaseClient.user.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, 10),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  findByEmail(email: string) {
    return databaseClient.user.findUnique({ where: { email } });
  }

  checkPassword(password: string, passwordToCompare: string): boolean {
    return bcrypt.compareSync(password, passwordToCompare);
  }
}
