export default async function userSetters(fastify) {
  fastify.post("/create", async (request, reply) => await fastify.userRepository.create(request.body));
  fastify.post("/update", async (request, reply) => await fastify.userRepository.updateById(request.body));
}
