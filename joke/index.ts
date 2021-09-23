import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Response } from "../common/common";

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

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<Response> {
  context.log.info("Hello from joke function!");

  const joke = jokeOfTheDay[Math.floor(Math.random() * jokeOfTheDay.length)];

  return {
    status: 200,
    body: { text: joke },
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export default httpTrigger;
