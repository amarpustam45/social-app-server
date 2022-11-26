import Like from '../models/Like.js';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const getLikes = async (req, res) => {
  try {
    const [likes, _] = await Like.getAllLikes(req.query.postId);
    return res.status(200).json(
      likes.map((like) => {
        return like.userId;
      })
    );
  } catch (error) {
    return res.status(500).json({ error, msg: 'Unable to get likes' });
  }
};

export const addLike = async (req, res) => {
  const token = req.cookies.socialAppAccessToken;
  const date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

  if (!token) return res.status(401).json('Not Authenticated! Please Login');
  jwt.verify(token, process.env.JWT_KEY, async (err, userInfo) => {
    if (err) res.status(403).json('Token is not valid!');

    try {
      await Like.addLike(req.body, userInfo.id);
      return res.status(200).json('Like has been added sucessfully!');
    } catch (error) {
      return res.status(500).json({ error, msg: 'Unable to add like' });
    }
  });
};

export const deleteLike = async (req, res) => {
  const token = req.cookies.socialAppAccessToken;
  const date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

  if (!token) return res.status(401).json('Not Authenticated! Please Login');
  jwt.verify(token, process.env.JWT_KEY, async (err, userInfo) => {
    if (err) res.status(403).json('Token is not valid!');

    try {
      await Comment.addComment(req.body, userInfo.id);
      return res.status(200).json('Like has been deleted sucessfully!');
    } catch (error) {
      return res.status(500).json({ error, msg: 'Unable to remove like' });
    }
  });
};
