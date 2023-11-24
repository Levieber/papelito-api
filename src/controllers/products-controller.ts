import { ProductsService } from "@/services/products-service";
import { CreateProductDto, UpdateProductDto } from "@/dtos/products-dtos";
import { ControllerBase } from "./controller-base";

export class ProductsController extends ControllerBase {
  constructor(private productsService: ProductsService) {
    super();
  }

  async create(body: CreateProductDto) {
    const product = await this.productsService.create(body);

    return this.created(product);
  }

  async index() {
    const products = await this.productsService.getAll();

    return this.ok(products);
  }

  async update(id: string, body: UpdateProductDto) {
    const productFound = await this.productsService.update(id, body);

    if (!productFound) {
      return this.notFound();
    }

    return this.noContent();
  }
}
