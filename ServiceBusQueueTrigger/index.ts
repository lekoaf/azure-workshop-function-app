import { AzureFunction, Context } from "@azure/functions";
import * as sharp from "sharp";
import { Image } from "../common";
interface Message {
  id: string;
  uri: string;
}

const serviceBusQueueTrigger: AzureFunction = async function (
  context: Context,
  inputMessage: Message
): Promise<void> {
  context.log("ServiceBus queue: ", inputMessage);

  const thumbnail = await sharp(context.bindings.inputBlob)
    .resize(250)
    .jpeg()
    .toBuffer();

  context.bindings.outputBlob = thumbnail;

  const { id, uri } = inputMessage;

  const out = {
    ...inputMessage,
    thumbnail: `${uri}/thumbnails/${id}.jpg`,
  };

  context.bindings.outputDocument = out;
};

export default serviceBusQueueTrigger;
