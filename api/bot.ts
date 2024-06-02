require("../src/bot");

import { webhookCallback } from "grammy";
import express from "express";
import { bot } from "../src";

const app = express();

app.use(express.json());
app.use("/api/bot", webhookCallback(bot));

export default app;
