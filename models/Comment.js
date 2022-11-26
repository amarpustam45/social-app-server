import db from '../config/db.js';

class Comment {
  constructor() {}

  static getAllComments(id) {
    const sql = `SELECT c.*,u.id as userId, u.name, u.profilePic from comments AS c 
    JOIN users AS u ON (u.id = c.userId) WHERE c.postId=${id} ORDER BY c.createdAt DESC`;

    return db.execute(sql);
  }

  static addComment(post, date, uid) {
    const sql = `INSERT into comments (comments.desc,createdAt,userId,postId)
      VALUES ('${post.desc}','${date}','${uid}',${post.postId});`;

    return db.execute(sql);
  }
}

export default Comment;
