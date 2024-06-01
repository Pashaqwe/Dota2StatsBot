import { Bot, webhookCallback } from "grammy";
import express from "express";

const bot = new Bot(String(process.env.TOKEN));

const app = express();
app.use(express.json());

app.use("/api/bot", webhookCallback(bot, "std/http"));
