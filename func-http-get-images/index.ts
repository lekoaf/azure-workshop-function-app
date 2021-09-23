import { AzureFunction, Context, HttpRequest } from "@azure/functions";

interface Image {
  id: string;
  uri: string;
}

interface Response {
  status: number;
  body?: unknown;
  headers?: {
    [key: string]: string;
  };
}

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
  };
};

export default httpTrigger;
