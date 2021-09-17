import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Container, CosmosClient } from "@azure/cosmos";

interface Response {
  status: number;
  body?: unknown;
  headers?: {
    [key: string]: string;
  };
}

interface City {
  id: string;
  name: string;
  state: string;
  isCapitol: boolean;
}

const jokeOfTheDay = [
  "I invented a new word! Plagiarism!",
  "Did  you hear about the calustrophobic astronaut? He just needed a little space.",
  "How do you drown a hipster? Throw him in the mainstream.",
  "What kind of exercise do lazy people do? Diddly-squats.",
  "What do you call a pony with a cough? A little horse!",
  "What is Forrest Gump's password? 1Forrest1.",
  "Why did the M&M go to school? He wanted to be a Smartie.",
  "What did one traffic light say to the other? Stop looking at me, I'm changing!",
  "What do you call bears with no ears? B.",
  "What's a foot long and slippery? A slipper!",
  "Why do French people eat snails? They don't like fast food!",
  "What's red and moves up and down? A tomato in an elevator!",
  "I invented a new word today: Plagiarism.",
  "What is sticky and brown? A stick!",
];

const setupDatabase = async () => {
  const client = new CosmosClient(process.env["COSMOS_CONNECTION_STRING"]);

  const { database } = await client.databases.createIfNotExists({
    id: process.env["COSMOS_DB_NAME"],
  });

  const { container } = await database.containers.createIfNotExists({
    id: process.env["COSMOS_CONTAINER_NAME"],
  });

  return container;
};

const fiddleWithDb = async (db: Container) => {
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

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log.info("Hello from joke function!");

  const joke = jokeOfTheDay[Math.floor(Math.random() * jokeOfTheDay.length)];

  const db = await setupDatabase();
  await fiddleWithDb(db);

  context.res = {
    status: 200,
    body: { text: joke },
    headers: {
      "Content-Type": "application/json",
    },
  } as Response;
};

export default httpTrigger;
