import type { FastifyRequest, FastifyReply } from "fastify";
import { ZodError } from "zod";
import { app } from "@/app";

export function errorHandler(
  error: unknown,
  _request: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof ZodError) {
    const errorMapper: Record<string, string> = {};

    error.issues.forEach((zodError) => {
      const [path] = zodError.path;
      errorMapper[path ?? "error"] = zodError.message;
    });

    return reply.status(400).send({
      message:
        "The request data is missing or invalid. Please check your input and try again",
      errors: errorMapper,
    });
  }

  if (
    typeof error === "object" &&
    error != null &&
    "code" in error &&
    error.code === "FAST_JWT_INVALID_SIGNATURE"
  ) {
    return reply.status(401).send({ message: "Invalid token" });
  }

  // Should log errors that not captured:
  app.log.error(error);
  reply.status(500).send({ message: "Internal Server Error" });
}
