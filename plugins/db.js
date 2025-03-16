import { neon } from '@neondatabase/serverless'
import fp from 'fastify-plugin'

export default fp(async function (fastify, opts) { 
  const db = neon(process.env.DATABASE_URL)

  fastify.decorate('db', db)
})