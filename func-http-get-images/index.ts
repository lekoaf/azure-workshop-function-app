import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Image, Response } from "../common";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
  images: Array<Image>
): Promise<Response> {
  if (images === undefined || images.length === 0) {
    return {
      status: 404,
    };
  }

  return {
    status: 200,
    body: images,
    headers: {
      "content-type": "application/json",
    },
  };
};

export default httpTrigger;
