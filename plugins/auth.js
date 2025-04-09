import fp from 'fastify-plugin'
import fastifyJwt from 'fastify-jwt'

export default fp(async (fastify, opts) => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_KEY
  })

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.code(401).send({ error: 'Invalid Token' })
    }
  })
})