import UserRepository from "./userRepository.js";

export default function getRepositoryInstances(fastify) {
  return {
    userRepository: new UserRepository(fastify),
  };
}
