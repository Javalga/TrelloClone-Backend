import { v4 as uuidv4 } from 'uuid'

export default async function auth(fastify) {
  fastify.post("/login", async (request, reply) => {
    try {
      let response = await fastify.userRepository.login(request.body.email, request.body.password)
      console.log(response)
      return reply.send({ user: response.user, token: response.token })
    } catch (error) {
      reply.code(401).send({error: error.message})
    }
  });

  fastify.post('/register', async (request, reply) => {
    try {
      const response = await fastify.userRepository.register(request.body)
      return reply.send({
        message: 'User registered successfully',
        token: response.token
      })

    } catch (error) {
      return reply.code(500).send({
        error: error.message || 'Error during registration'
      })
    }
  })
} 