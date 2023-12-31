import { databaseClient } from "@/config/database-client";
import { CreateProductDto, UpdateProductDto } from "@/dtos/products-dtos";
import { Prisma } from "@prisma/client";

export class ProductsService {
  create({ name, description, price }: CreateProductDto) {
    return databaseClient.product.create({
      data: { name, description, price },
    });
  }

  getAll() {
    return databaseClient.product.findMany();
  }

  getById(id: string) {
    return databaseClient.product.findUnique({ where: { id } });
  }

  async update(
    id: string,
    { name, description, price }: UpdateProductDto
  ): Promise<boolean> {
    try {
      await databaseClient.product.update({
        data: {
          name,
          description,
          price,
        },
        where: {
          id,
        },
      });
      return true;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return false;
      }
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await databaseClient.product.delete({
        where: {
          id,
        },
      });
      return true;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return false;
      }
      throw error;
    }
  }
}
