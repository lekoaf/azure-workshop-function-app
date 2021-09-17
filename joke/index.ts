import { AzureFunction, Context, HttpRequest } from "@azure/functions";

interface Response {
  status: number;
  body?: unknown;
  headers?: {
    [key: string]: string;
  };
}

const jokeOfTheDay = "I invented a new word! Plagiarism!";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("Joke of the day.");

  context.res = {
    status: 200,
    body: { text: jokeOfTheDay },
    headers: {
      "Content-Type": "application/json",
    },
  } as Response;
};

export default httpTrigger;
