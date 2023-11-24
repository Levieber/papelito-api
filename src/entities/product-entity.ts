import { Prisma } from "@prisma/client";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number | Prisma.Decimal;
}
