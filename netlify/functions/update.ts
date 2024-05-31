import { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  if (event.body) {
    const bodyRequest = {
      chat_id: JSON.parse(event.body).message.chat.id,
      text: "I got your message!",
    };

    await fetch(
      `https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`,
      {
        method: "POST",
        body: JSON.stringify(bodyRequest),
      }
    );

    console.log(event.body, process.env.TOKEN);
  }

  console.log("Received an update from Telegram!", event.body);
  return { statusCode: 200 };
};

export { handler };
