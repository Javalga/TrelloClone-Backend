import Repository from './repository.js'
import User from '../models/User.js'

export default class UserRepository extends Repository{
  constructor(fastify){
    super(fastify, 'users')
  }

  async getAll() {
    return await super.getAll()
  }
  async getBy(key, value) {
    return await super.getBy(key, value);
  }
  async create(data) {
    const newUser = User.fromObject(data)
    const isValid = User.validate(newUser)
    return isValid instanceof Error ? isValid : await super.create(newUser); 
  }
  async updateById(updatedData) {
    const updatedUser = User.fromObject(updatedData);
    const isValid = User.validate(updatedUser);
    return isValid instanceof Error
      ? isValid
      : await super.updateById(updatedUser);
  }
}