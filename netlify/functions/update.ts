import { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  // if (event.body) {
  const bodyRequest = {
    chat_id: JSON.parse(event.body).message.chat.id,
    text: "I got your message!",
  };

  await fetch(
    `https://api.telegram.org/bot7261527510:AAFIYYCShhudAR0m0InYTZwAhLswVS9zyFw/sendMessage`,
    {
      method: "POST",
      body: JSON.stringify(bodyRequest),
    }
  );
  // }

  console.log("Received an update from Telegram!", event.body);
  return { statusCode: 200 };
};

export { handler };
