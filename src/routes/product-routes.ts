import { app } from "@/app";
import { ProductsController } from "@/controllers/products-controller";
import { createProductDtoSchema } from "@/dtos/products-dtos";
import { ProductsService } from "@/services/products-service";

const productsService = new ProductsService();
const productsController = new ProductsController(productsService);

export async function productRoutes() {
  app.post("/products", async (request, reply) => {
    const { statusCode, body } = await productsController.create(
      createProductDtoSchema.parse(request.body)
    );

    reply.status(statusCode).send(body);
  });

  app.get("/products", async (_request, reply) => {
    const { statusCode, body } = await productsController.index()

    reply.status(statusCode).send(body)
  })
}
