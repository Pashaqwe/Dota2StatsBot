import { Bot, webhookCallback } from "grammy";

// const token = process.env.TOKEN;
// if (!token) throw new Error(`BOT_TOKEN is unset ${token}`);

const bot = new Bot("7261527510:AAFIYYCShhudAR0m0InYTZwAhLswVS9zyFw");

bot.command("start", (ctx) => {
  return ctx.reply("asd");
});

bot.start();

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: unknown,
  res: unknown,
  fn: (...args: unknown[]) => Promise<unknown>
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

async function handler(req: unknown, res: unknown) {
  // Run the middleware
  console.log(req, res);

  await runMiddleware(req, res, webhookCallback(bot));
}

export default handler;
