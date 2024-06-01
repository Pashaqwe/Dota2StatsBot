import { Handler } from "@netlify/functions";
import { bot } from "../../src/config";

const handler: Handler = async (event) => {
  const update = event.body;

  bot.handleUpdate(update);

  console.log("Received an update from Telegram!", event.body);
  return { statusCode: 200 };
};

export { handler };
