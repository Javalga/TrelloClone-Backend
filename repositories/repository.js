export default class Repository {
  constructor(fastify, tableName) {
    this.db = fastify.db;
    this.table = tableName;
  }

  async getAll() {
    const query = `SELECT * FROM ${this.table}`;
    try {
      const result = await this.db.query(query);
      return result.rows;
    } catch (err) {
      throw new Error(
        `Error fetching data from ${this.tableName}: ${err.message}`
      );
    }
  }

  async getBy(key, value) {
    const query = `SELECT * FROM ${this.table} WHERE ${key} = $1`;
    try {
      const result = await this.db.query(query, [value]);
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Error fetching user by ${key} in ${this.table}: ${err.message}`
      );
    }
  }

  async create(data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const columns = keys.join(", ");
    const placeholders = keys.map((_, index) => `$${index + 1}`).join(", ");
    const query = `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders}) RETURNING *`;

    try {
      const result = await this.db.query(query, values);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error creating in ${this.table}: ${err.message}`);
    }
  }

  async updateById(updatedData) {
    const keys = Object.keys(updatedData);
    const values = Object.values(updatedData);
    const setColumns = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");
    const query = `UPDATE ${this.table} SET ${setColumns} WHERE id = $${keys.length + 1} RETURNING *`;

    try {
      const result = await this.db.query(query, [...values, updatedData.id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error updating in ${this.table}: ${err.message}`);
    }
  }
}
