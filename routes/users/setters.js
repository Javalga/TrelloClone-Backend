export default async function userSetters(fastify) {
  fastify.post("", async (req, res) => await fastify.userRepository.create(req.body));
  fastify.post("/update", async (req, res) => await fastify.userRepository.updateById(req.body));
}
