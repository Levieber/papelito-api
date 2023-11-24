import { Prisma } from "@prisma/client";
import { z, type Schema } from "zod";
import { Product } from "@/entities/product-entity";

export const createProductDtoSchema: Schema<Omit<Product, "id">> = z.object({
  name: z.string().trim().min(3).max(250),
  description: z.string().trim().max(550).nullable(),
  price: z
    .number()
    .refine((val) => new Prisma.Decimal(val).gte("0.01"))
    .transform((val) => new Prisma.Decimal(val)),
});

export type CreateProductDto = z.infer<typeof createProductDtoSchema>;
