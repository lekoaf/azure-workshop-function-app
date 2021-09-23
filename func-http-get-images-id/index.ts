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
  image: Image
): Promise<Response> {
  if (image === undefined) {
    return {
      status: 404,
    };
  }

  return {
    status: 200,
    body: {
      id: image.id,
      uri: image.uri,
    },
  };
};

export default httpTrigger;
