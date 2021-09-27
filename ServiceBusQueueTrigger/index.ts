import { AzureFunction, Context } from "@azure/functions";
import * as sharp from "sharp";
import { Image } from "../common";

const serviceBusQueueTrigger: AzureFunction = async function (
  context: Context,
  inputMessage: Image
): Promise<void> {
  context.log("ServiceBus queue: ", inputMessage);

  const thumbnail = await sharp(context.bindings.inputBlob)
    .resize(250)
    .jpeg()
    .toBuffer();

  context.bindings.outputBlob = thumbnail;

  const { id } = inputMessage;
  const url = new URL(inputMessage.uri);

  const out = {
    ...inputMessage,
    thumbnail: `${url.protocol}//${url.hostname}/thumbnails/${id}.jpg`,
  };

  context.bindings.outputDocument = out;
};

export default serviceBusQueueTrigger;
