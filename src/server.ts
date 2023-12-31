import { PORT } from "@/config/environment-variables";
import { databaseClient } from "@/config/database-client";
import { app } from "./app";

async function bootstrap() {
	try {
		await app.listen({ port: PORT, host: '0.0.0.0' });
	} catch (error) {
		app.log.error(error);
		process.exit(1);
	} finally {
    databaseClient.$disconnect()
  }
}

bootstrap();
