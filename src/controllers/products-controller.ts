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

  async show(id: string) {
    const product = await this.productsService.getById(id)

    if (!product) {
      return this.notFound()
    }

    return this.ok(product)
  }

  async update(id: string, body: UpdateProductDto) {
    const productFound = await this.productsService.update(id, body);

    if (!productFound) {
      return this.notFound();
    }

    return this.noContent();
  }

  async delete(id: string) {
    const productFound = await this.productsService.delete(id);

    if (!productFound) {
      return this.notFound();
    }

    return this.noContent();
  }
}
