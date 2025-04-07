import { v4 as uuidv4 } from 'uuid';
export default class User {
  constructor(
    id,
    full_name,
    email,
    password_hash,
    created_at,
    updated_at,
  ) {
    this.id = id;
    this.full_name = full_name;
    this.email = email;
    this.password_hash = password_hash;
    this.created_at = created_at
    this.updated_at = updated_at
  }

  static get rules() {
    return {
      full_name: {
        check: (val) => val && typeof val === "string",
        desc: "Full name is required and must be a string",
      },
      email: {
        check: (val) => val && /^\S+@\S+\.\S+$/.test(val),
        desc: "A valid email is required",
      },
      password_hash: {
        check: (val) => val && typeof val === "string",
        desc: "Password hash is required",
      },
    };
  }

  static validate(data) {
    const errors = [];

    Object.entries(this.rules).forEach(([key, { check, desc }]) => {
      if (!check(data[key])) errors.push(desc);
    });

    if (errors.length > 0) {
      throw new Error(`User validation failed: ${errors.join(", ")}`);
    }

    return true;
  }

  static fromObject(obj) {
    return new User(
      obj.id ?? uuidv4(),
      obj.full_name,
      obj.email,
      obj.password_hash
    );
  }

  toJson() {
    return {
      id: this.id,
      full_name: this.full_name,
      email: this.email,
      password_hash: this.password_hash,
      created_at: this.created_at ? this.created_at.toISOString() : null,
      updated_at: this.updated_at ? this.updated_at.toISOString() : null,
      role: this.role,
    };
  }
}
