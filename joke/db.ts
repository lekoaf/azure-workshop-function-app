import { Container, CosmosClient } from "@azure/cosmos";

interface City {
  id: string;
  name: string;
  state: string;
  isCapitol: boolean;
}

export const setupDatabase = async () => {
  const client = new CosmosClient(process.env["COSMOS_CONNECTION_STRING"]);

  const { database } = await client.databases.createIfNotExists({
    id: process.env["COSMOS_DB_NAME"],
  });

  const { container } = await database.containers.createIfNotExists({
    id: process.env["COSMOS_CONTAINER_NAME"],
  });

  return container;
};

export const fiddleWithDb = async (db: Container) => {
  const cities: Array<City> = [
    { id: "1", name: "Olympia", state: "WA", isCapitol: true },
    { id: "2", name: "Redmond", state: "WA", isCapitol: false },
    { id: "3", name: "Chicago", state: "IL", isCapitol: false },
  ];

  for (const city of cities) {
    db.items.create(city);
  }

  const item1 = await db.item("1").read<City>();

  console.log("<<<< ITEM 1 >>>>>", item1.resource.name);

  const { resources } = await db.items
    .query<City>("SELECT * from c")
    .fetchAll();

  for (const city of resources) {
    await db.item(city.id).delete();
    console.log("Sucessfully deleted id", city.id);
  }
};
