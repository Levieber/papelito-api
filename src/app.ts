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
  origin: (origin, cb) => {
    if (process.env.NODE_ENV === "development") {
      cb(null, true);
      return;
    }

    if (!origin) {
      cb(new Error("Not allowed"), false);
      return
    }

    const normalizedOrigin = origin.endsWith("/")
      ? origin.slice(0, -1)
      : origin;
    const normalizedDashboardOrigin = DASHBOARD_ORIGIN.endsWith("/")
      ? DASHBOARD_ORIGIN.slice(0, -1)
      : DASHBOARD_ORIGIN;

    if (normalizedOrigin === normalizedDashboardOrigin) {
      cb(null, true);
      return;
    }

    cb(new Error("Not allowed"), false);
  },
});

app.register(authenticate);

app.register(authRoutes);

app.register(productRoutes);
