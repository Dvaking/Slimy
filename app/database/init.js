import { createTables, servers } from "#database";

export async function initTables() {
  console.log("Start init tables");
  await createTables(servers).then(() => {
    console.log("tables server created !");
  });
}
