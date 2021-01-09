const db = require('../services/db');

class User {
  static tableName = 'users';

  static async findByName(userName) {
    return db.select().from(User.tableName).where({ name: userName }).first();
  }
}

module.exports = User;
