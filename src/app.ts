import Fastify from "fastify";
import { errorHandler } from "@/middlewares/error-handler";
import { authenticate } from "@/middlewares/authentication-middleware";
import { productRoutes } from "@/routes/product-routes";
import { authRoutes } from "@/routes/auth-routes";

export const app = Fastify({
	logger: process.env.NODE_ENV === "development",
});

app.setErrorHandler(errorHandler)

app.register(authenticate)

app.register(authRoutes)

app.register(productRoutes)
