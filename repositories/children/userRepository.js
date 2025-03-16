import Repository from '../repository.js'

export default class UserRepository extends Repository{
  constructor(fastify){
    super(fastify, 'users')
  }
}