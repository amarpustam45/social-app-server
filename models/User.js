import db from '../config/db.js';

class User {
  constructor() {}

  static getUser(id) {
    const sql = `SELECT * FROM users WHERE id=${id}`;

    return db.execute(sql);
  }

  static updateUser(user, uid) {
    const sql = `UPDATE users SET username='${user.username}', name='${user.name}', coverPic='${user.coverPic}', 
    profilePic='${user.profilePic}', city='${user.city}', website='${user.website}' WHERE id=${uid};`;

    return db.execute(sql);
  }
}

export default User;
