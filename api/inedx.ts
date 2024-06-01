import { webhookCallback } from "grammy";
import { bot } from "../src/config";

type MiddlewareFn = (
  req: unknown,
  res: unknown,
  next: (err?: unknown) => void
) => void;

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: unknown, res: unknown, fn: MiddlewareFn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

async function handler(req: unknown, res: unknown) {
  // Run the middleware
  await runMiddleware(req, res, webhookCallback(bot));
}

export default handler;
