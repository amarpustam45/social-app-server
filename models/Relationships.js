import db from '../config/db.js';

class Relationship {
  constructor() {}

  static getAllRelationships(id) {
    const sql = `SELECT followerUserId FROM relationships WHERE followedUserId=${id}`;

    return db.execute(sql);
  }

  static addRelationship(fid, uid) {
    const sql = `INSERT into relationships (followerUserId,followedUserId)
      VALUES ('${uid}',${fid});`;

    return db.execute(sql);
  }

  static deleteRelationship(fid, uid) {
    const sql = `DELETE FROM relationships where followerUserId=${uid} and followedUserId=${fid};`;

    return db.execute(sql);
  }
}

export default Relationship;
