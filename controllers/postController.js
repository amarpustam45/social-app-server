import Post from '../models/Post.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import moment from 'moment';

dotenv.config();

export const getPosts = async (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.socialAppAccessToken;

  if (!token) return res.status(401).json('Not Authenticated! Please Login');
  jwt.verify(token, process.env.JWT_KEY, async (err, userInfo) => {
    if (err) res.status(403).json('Token is not valid!');

    try {
      let [posts, _] = await Post.getAllPosts(userId, userInfo.id);
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
};

export const addPost = async (req, res) => {
  const token = req.cookies.socialAppAccessToken;
  const date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

  if (!token) return res.status(401).json('Not Authenticated! Please Login');
  jwt.verify(token, process.env.JWT_KEY, async (err, userInfo) => {
    if (err) res.status(403).json('Token is not valid!');

    try {
      await Post.addPost(req.body, date, userInfo.id);
      return res.status(200).json('Post has been added sucessfully!');
    } catch (error) {
      return res.status(500).json({ error, msg: 'Unable to add post' });
    }
  });
};
