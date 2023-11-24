import { ProductsService } from "@/services/products-service";
import { CreateProductDto } from "@/dtos/products-dtos";
import { ControllerBase } from "./controller-base";

export class ProductsController extends ControllerBase {
  constructor(private productsService: ProductsService) {
    super();
  }

  async create(body: CreateProductDto) {
    const product = await this.productsService.create(body);

    return this.created(product);
  }
}
