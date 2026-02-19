import { seed } from "drizzle-seed";
import { db } from ".";
import { users } from "./schema/users";


async function main() {
  await seed(db, { users }, { count: 10, seed: 123 });
}

main();