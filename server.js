import Fastify from 'fastify'
import path from 'node:path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import AutoLoad from '@fastify/autoload'

// Convertir import.meta.url a __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Cargar variables de entorno
dotenv.config()


export const options = {}

const fastify = Fastify()
  
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins'),
  options: { ...options }
})

fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'routes'),
  options: { ...options }
})

const start = async () => {
  try {
    fastify.listen({ port: process.env.PORT || 3000 })
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 3000}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()