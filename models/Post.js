import db from '../config/db.js';

class Post {
  constructor() {}

  static getAllPosts(userId, id) {
    if (userId === 'undefined') userId = undefined;
    const sql = userId
      ? `SELECT p.*,u.id as userId, u.name, u.profilePic from posts AS p 
      JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ${userId} ORDER BY p.createdAt DESC`
      : `SELECT p.*,u.id as userId, u.name, u.profilePic from posts AS p 
      JOIN users AS u ON (u.id = p.userId) LEFT
      JOIN relationships AS r ON (p.userId=r.followedUserId) WHERE r.followerUserId = ${id} 
      OR p.userId = ${id} ORDER BY p.createdAt DESC`;

    return db.execute(sql);
  }

  static addPost(post, date, uid) {
    const sql = `INSERT into posts (posts.desc,img,userId,createdAt)
      VALUES ('${post.desc}','${post.img}','${uid}','${date}');`;

    return db.execute(sql);
  }

  static deletePost(pid, uid) {
    const sql = `DELETE FROM posts WHERE id=${pid} AND userId=${uid};`;

    return db.execute(sql);
  }
}

export default Post;
