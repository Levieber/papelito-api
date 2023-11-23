import Fastify from "fastify";

export const app = Fastify({
	logger: process.env.NODE_ENV === "development",
});
