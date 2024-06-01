import { Handler } from "@netlify/functions";
import { bot } from "../../src/config";

const handler: Handler = async (event) => {
  const update = event.body;

  await fetch("/article/fetch/post/user", {
    method: "POST",
    body: JSON.stringify({
      chat_id: JSON.parse(event.body).message.chat.id,
      text: "I got your message!",
    }),
  });

  bot.handleUpdate(update, "message");

  console.log("Received an update from Telegram!", event.body);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Message received" }),
  };
};

export { handler };
