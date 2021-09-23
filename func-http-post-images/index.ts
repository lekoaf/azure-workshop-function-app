import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";
import { v4 } from "uuid";

interface Response {
  status: number;
  body?: unknown;
  headers?: {
    [key: string]: string;
  };
}

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<Response> {
  const uuid = v4();
  context.log(typeof req.body);
  const image = req.body;

  const client = await BlobServiceClient.fromConnectionString(
    process.env.IMAGE_CONNECTION_STRING
  )
    .getContainerClient(process.env.IMAGE_CONTAINER_NAME)
    .getBlockBlobClient(`${uuid}.jpg`);

  const uri = client.url;

  await client.uploadData(image);

  const body = {
    id: uuid,
    uri,
  };

  context.bindings.imageDocument = body;

  return {
    status: 201, // Created
    body,
  };
};

export default httpTrigger;
