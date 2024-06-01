import { Bot, webhookCallback } from "grammy";
import express from "express";

const bot = new Bot("7261527510:AAFIYYCShhudAR0m0InYTZwAhLswVS9zyFw");

bot.command("start", async (ctx) => {
  await ctx.reply("Hello!");
});

bot.start();

const app = express();
app.use(express.json());
app.use("/api/bot", webhookCallback(bot));

export default app;
