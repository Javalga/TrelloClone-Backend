import Repository from "./repository.js";
import User from "../models/User.js";

export default class UserRepository extends Repository {
  constructor(fastify) {
    super(fastify, "users");
    this.fastify = fastify;
  }

  async getAll() {
    return await super.getAll();
  }

  async getBy(key, value) {
    return await super.getBy(key, value);
  }

  async register(data) {
    const newUser = User.fromObject(data);
    const isValid = User.validate(newUser);

    if (isValid instanceof Error) {
      throw isValid;
    }

    await super.create(newUser);

    const token = this.fastify.jwt.sign( 
      { id: newUser.id, email: newUser.email },
      { expiresIn: '1h' }
    );

    return { token };
  }

  async updateById(updatedData) {
    const updatedUser = User.fromObject(updatedData);
    const isValid = User.validate(updatedUser);
    return isValid instanceof Error ? isValid : await super.updateById(updatedUser);
  }

  async login(email, password) {
    const allUsers = await super.getAll();
    const user = allUsers.find(user => user.email === email && user.password === password);

    if (!user) throw new Error('Invalid Credentials');

    const token = this.fastify.jwt.sign({ id: user.id, username: user.username });

    return { user, token };
  }
}
