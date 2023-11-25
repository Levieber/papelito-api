import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { DASHBOARD_ORIGIN } from "@/config/environment-variables";
import { errorHandler } from "@/middlewares/error-handler";
import { authenticate } from "@/middlewares/authentication-middleware";
import { productRoutes } from "@/routes/product-routes";
import { authRoutes } from "@/routes/auth-routes";

export const app = Fastify({
  logger: process.env.NODE_ENV === "development",
});

app.setErrorHandler(errorHandler);

app.register(helmet, { global: true });

app.register(cors, {
  origin: process.env.NODE_ENV === "development" ? "*" : DASHBOARD_ORIGIN,
});

app.register(authenticate);

app.register(authRoutes);

app.register(productRoutes);
