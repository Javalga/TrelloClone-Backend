import UserRepository from "../../repositories/userRepository.js";

export default async function userGetters(fastify) {
  fastify.get("", async (req, res) => await fastify.userRepository.getAll());
  fastify.get("by", async (req, res) => await fastify.userRepository.getBy(req.query.key, req.query.value));
}
