import { Bot } from "grammy";
import { TContext } from "../../config";

export const development = async (bot: Bot<TContext>): Promise<void> => {
  console.log(process.env.NODE_ENV, "111111111111");

  try {
    await bot.api.deleteWebhook();
    console.log("[SERVER] Bot starting polling");
    await bot.start();
  } catch (e) {
    console.error(e);
  }
};

export const production = async (bot: Bot<TContext>): Promise<void> => {
  console.log(process.env.NODE_ENV, "222222222222222");
  try {
    await bot.api.setWebhook(`${process.env.WEBHOOK_DOMAIN}/api/index`);
    console.log(`[SERVER] Bot starting webhook`);
  } catch (e) {
    console.error(e);
  }
};
