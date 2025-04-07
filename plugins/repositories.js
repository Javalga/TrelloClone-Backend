import fp from "fastify-plugin";
import getRepositoryInstances from "../repositories/index.js";

export default fp(async function (fastify, opts) {
  const repositories = getRepositoryInstances(fastify);

  Object.entries(repositories).forEach(([name, instance]) => {
    fastify.decorate(name, instance);
  });
});
