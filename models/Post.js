import db from '../config/db.js';

class Post {
  constructor() {}

  static getAllPosts(id) {
    const sql = `SELECT p.*,u.id as userId, u.name, u.profilePic from posts AS p 
      JOIN users AS u ON (u.id = p.userId) LEFT
      JOIN relationships AS r ON (p.userId=r.followedUserId) WHERE r.followerUserId = ${id} 
      OR p.userId = ${id} ORDER BY p.createdAt DESC`;
    return db.execute(sql);
  }
}

export default Post;
