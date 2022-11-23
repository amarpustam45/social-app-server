import Post from '../models/Post.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const getPosts = async (req, res) => {
  const token = req.cookies.socialAppAccessToken;

  if (!token) return res.status(401).json('Not logged in');
  jwt.verify(token, process.env.JWT_KEY, async (err, userInfo) => {
    if (err) res.status(403).json('User not Authenticated!');

    try {
      let [posts, _] = await Post.getAllPosts(userInfo.id);
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
};
