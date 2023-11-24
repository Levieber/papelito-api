import fastifyJwt from "@fastify/jwt";
import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { JWT_SECRET_KEY } from "@/config/environment-variables";
import { AuthService } from "@/services/auth-service";

export const authenticate: FastifyPluginCallback = fastifyPlugin(function (
  app,
  _opts,
  done
) {
  app.register(fastifyJwt, {
    secret: JWT_SECRET_KEY,
  });

  app.decorate(
    "authenticate",
    async function (
      request: FastifyRequest,
      reply: FastifyReply
    ): Promise<void> {
      const token = request.headers.authorization?.split(" ")[1];

      if (!token) {
        return reply.status(401).send({ message: "Token must be provided" });
      }

      AuthService.verify(token);
    }
  );

  done();
});
