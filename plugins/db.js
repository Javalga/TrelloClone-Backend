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
    console.error("Error de conexión a la base de datos:", err.message);
    fastify.log.error("Error de conexión a la base de datos:", err);
    process.exit(1);
  }
});
