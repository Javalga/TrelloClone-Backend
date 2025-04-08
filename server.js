import Fastify from "fastify";
import path from "node:path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import AutoLoad from "@fastify/autoload";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

export const options = {};

const fastify = Fastify();

fastify.register(AutoLoad, {
  dir: path.join(__dirname, "plugins"),
});

fastify.register(AutoLoad, {
  dir: path.join(__dirname, "routes"),
});

fastify.addHook("onReady", async () => {
  console.log(fastify.printRoutes());
});

const start = async () => {
  try {
    fastify.listen({ port: process.env.PORT || 3000 });
    console.log(
      `Servidor running on http://localhost:${process.env.PORT || 3000}`
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
