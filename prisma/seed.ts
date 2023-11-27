import { PrismaClient } from "@prisma/client";
import * as env from "env-var";
import bcrypt from "bcrypt"

const email = env.get("ADMIN_ROOT_EMAIL").required().asEmailString();
const password = env.get("ADMIN_ROOT_PASSWORD").required().asString();

const databaseClient = new PrismaClient()

async function main() {
  await databaseClient.user.upsert({
    where: {
      email,
    },
    update: {},
    create: {
      name: "admin-root",
      email,
      password: bcrypt.hashSync(password, 10),
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
