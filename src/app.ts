import Fastify from "fastify";
import { errorHandler } from "@/middlewares/error-handler";
import { productRoutes } from "@/routes/product-routes";

export const app = Fastify({
	logger: process.env.NODE_ENV === "development",
});

app.setErrorHandler(errorHandler)

app.register(productRoutes)
