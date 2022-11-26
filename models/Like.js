import db from '../config/db.js';

class Like {
  constructor() {}

  static getAllLikes(id) {
    const sql = `SELECT userId FROM likes WHERE postId=${id}`;

    return db.execute(sql);
  }

  static addLike(post, uid) {
    const sql = `INSERT into likes (userId,postId)
      VALUES ('${uid}',${post.postId});`;

    return db.execute(sql);
  }

  static deleteLike(post, uid) {
    const sql = `DELETE FROM likes where userId=${uid} and postId=${post};`;

    return db.execute(sql);
  }
}

export default Like;
