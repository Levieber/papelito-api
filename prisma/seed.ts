import { databaseClient } from "@/config/database-client";
import * as env from "env-var";

const email = env.get("ADMIN_ROOT_EMAIL").required().asEmailString();
const password = env.get("ADMIN_ROOT_PASSWORD").required().asString();

async function main() {
  await databaseClient.user.upsert({
    where: {
      email,
    },
    update: {},
    create: {
      name: "admin-root",
      email,
      password,
    },
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await databaseClient.$disconnect();
  });
