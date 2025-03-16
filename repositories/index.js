import UserRepository from "./children/userRepository";

export default function getRepositoryInstances (fastify){
  return ({
    userRepository: new UserRepository(fastify)
  })
}