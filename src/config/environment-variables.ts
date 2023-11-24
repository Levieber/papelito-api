import * as env from "env-var";

export const DATABASE_URL = env.get("DATABASE_URL").required().asString();
export const PORT = env.get("PORT").default(3333).asPortNumber();
export const JWT_SECRET_KEY = env.get("JWT_SECRET_KEY").required().asString();
export const DASHBOARD_ORIGIN = env
  .get("DASHBOARD_ORIGIN")
  .required(process.env.NODE_ENV !== "development")
  .asUrlString();
