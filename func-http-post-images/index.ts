import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";
import { v4 } from "uuid";
import { Response } from "../common";
import * as sharp from "sharp";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<Response> {
  const uuid = v4();
  const image = req.body;

  const baseClient = await BlobServiceClient.fromConnectionString(
    process.env.IMAGE_CONNECTION_STRING
  );

  const client = baseClient
    .getContainerClient(process.env.IMAGE_CONTAINER_NAME)
    .getBlockBlobClient(`${uuid}.jpg`);

  const uri = client.url;

  await client.uploadData(image);

  const metadata = await sharp(image).metadata();

  const { width, height, size, format } = metadata;

  const body = {
    id: uuid,
    uri,
    metadata: {
      width,
      height,
      size,
      format,
    },
  };

  context.bindings.imageDocument = body;
  context.bindings.outputMessage = { id: uuid, uri: baseClient.url };

  return {
    status: 201, // Created
    body,
  };
};

export default httpTrigger;
