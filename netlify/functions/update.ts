import { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  console.log("Received an update from Telegram!", event.body);
  return { statusCode: 200 };
};

export { handler };
