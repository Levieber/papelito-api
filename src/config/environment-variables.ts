import * as env from "env-var";

export const DATABASE_URL = env.get("DATABASE_URL").required().asString();
export const PORT = env.get("PORT").default(3333).asPortNumber();
