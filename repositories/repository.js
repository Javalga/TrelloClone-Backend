export default class Repository{
  constructor(fastify, tableName){
    this.db = fastify.db
    this.table = tableName
  }

  async create(data){
    const keys = Object.keys(data)
    const values = Object.values(data)
    const columns = keys.join(', ')
    const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ')
    const query = `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders}) RETURNING *`
    
    try {
      const result = await this.db.query(query, values);
      return result.rows[0]
    } catch (err) {
      throw new Error(`Error al crear el registro en ${this.tableName}: ${err.message}`);
    }
  }
}