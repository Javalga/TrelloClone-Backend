export default async function(fastify, opts){
  fastify.get('/test-db', async (request, reply) => {
    try {
      // Realizar una consulta simple para probar la conexión
      const result = await fastify.db`SELECT NOW()`;
      return { success: true, message: 'Conexión exitosa a la base de datos', result };
    } catch (error) {
      return { success: false, message: 'Error al conectar a la base de datos', error: error.message };
    }
  });
}