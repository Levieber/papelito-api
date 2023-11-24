import { databaseClient } from "@/config/database-client";
import { CreateProductDto } from "@/dtos/products-dtos";

export class ProductsService {
  create({ name, description, price }: CreateProductDto) {
    return databaseClient.product.create({ data: { name, description, price }});
  }

  getAll() {
    return databaseClient.product.findMany()
  }
}
