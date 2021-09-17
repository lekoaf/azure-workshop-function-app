import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const jokeOfTheDay = "I invented a new work! Plagiarism!";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("Joke of the day.");

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: { joke: jokeOfTheDay },
  };
};

export default httpTrigger;
