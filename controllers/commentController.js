import Comment from '../models/Comment.js';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const getComments = async (req, res) => {
  try {
    let [posts, _] = await Comment.getAllComments(req.query.postId);
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const addComment = async (req, res) => {
  const token = req.cookies.socialAppAccessToken;
  const date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

  if (!token) return res.status(401).json('Not Authenticated! Please Login');
  jwt.verify(token, process.env.JWT_KEY, async (err, userInfo) => {
    if (err) res.status(403).json('Token is not valid!');

    try {
      await Comment.addComment(req.body, date, userInfo.id);
      return res.status(200).json('Comment has been added sucessfully!');
    } catch (error) {
      return res.status(500).json({ error, msg: 'Unable to add comment' });
    }
  });
};
