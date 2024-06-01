import { webhookCallback } from "grammy";
import express from "express";
import { bot } from "../src/config/config.ts";

const app = express();
app.use(express.json());

app.use("/api/bot", webhookCallback(bot, "std/http"));
