import { createClient } from "redis";
import { Redis } from "ioredis";

const client = createClient();

client
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect()
  .then(() => console.log("Redis connected"));

export const redis = new Redis(client);

