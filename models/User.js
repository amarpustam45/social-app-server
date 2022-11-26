import db from '../config/db.js';

class User {
  constructor() {}

  static getUser(id) {
    const sql = `SELECT * FROM users WHERE id=${id}`;

    return db.execute(sql);
  }

  static addUser(post, uid) {
    const sql = `INSERT into Users (userId,postId)
      VALUES ('${uid}',${post.postId});`;

    return db.execute(sql);
  }

  static deleteUser(post, uid) {
    const sql = `DELETE FROM Users where userId=${uid} and postId=${post};`;

    return db.execute(sql);
  }
}

export default User;
