import type { FastifyRequest, FastifyReply } from "fastify";
import { ZodError } from "zod";
import { app } from "@/app";

export function errorHandler(
	error: unknown,
	_request: FastifyRequest,
	reply: FastifyReply,
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

	// Should log errors that not captured:
	app.log.error(error);
	reply.status(500).send({ message: "Internal Server Error" });
}
