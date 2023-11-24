import { z } from "zod";

export const idParamsDtoSchema = z.object({ id: z.string().uuid("Invalid ID") })
