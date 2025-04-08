import fp from "fastify-plugin";
import pkg from "pg";
const { Client } = pkg;

export default fp(async function (fastify, opts) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    fastify.decorate("db", client);
  } catch (err) {
    console.error("Error connecting to the db:", err.message);
    fastify.log.error("Error connecting to the db:", err);
    process.exit(1);
  }
});
