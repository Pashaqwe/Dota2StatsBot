import { Bot } from "grammy";
import { TContext } from "../../config";

export const development = async (bot: Bot<TContext>): Promise<void> => {
  try {
    await bot.api.deleteWebhook();
    console.log("[SERVER] Bot starting polling");
    await bot.start();
  } catch (e) {
    console.error(e);
  }
};

export const production = async (bot: Bot<TContext>): Promise<void> => {
  try {
    await bot.api.setWebhook(
      `${process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/bot`
    );
    console.log(`[SERVER] Bot starting webhook`);
  } catch (e) {
    console.error(e);
  }
};
