export default async function userGetters(fastify) {
  fastify.get("", async (request, reqply) => await fastify.userRepository.getAll());
  fastify.get("/by", async (request, reqply) => await fastify.userRepository.getBy(request.query.key, request.query.value));
}
