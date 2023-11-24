import { AuthController } from "@/controllers/auth-controller";
import { UsersService } from "@/services/users-service";
import { app } from "@/app";
import { signInDtoSchema, signUpDtoSchema } from "@/dtos/auth-dtos";

const usersService = new UsersService();
const authController = new AuthController(usersService);

export async function authRoutes() {
  app.post("/sign-up", async (request, reply) => {
    const { statusCode, body } = await authController.signUp(
      signUpDtoSchema.parse(request.body)
    );
    reply.status(statusCode).send(body);
  });

  app.post("/sign-in", async (request, reply) => {
    const { statusCode, body } = await authController.signIn(
      signInDtoSchema.parse(request.body)
    );
    reply.status(statusCode).send(body);
  });
}
