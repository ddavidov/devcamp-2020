const db = require('../services/db');

class User {
  static tableName = 'users';

  static async findByName(userName) {
    return db.select().from(User.tableName).where({ name: userName }).first();
  }

  static async saveUser(user) {
    let result = null;
    // WARNING: validate incoming data before insert or update
    if (user.id) {
      result = db(User.tableName).where('id', '=', user.id).update(user);
    } else {
      // @TODO: Use Insert statement to create new user:
    }

    return result;
  }

  static findByToken(token) {
    return db.select().from(User.tableName).where({ token }).first();
  }
}

module.exports = User;
