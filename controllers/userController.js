import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const getUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const [user, _] = await User.getUser(userId);
    const { password, ...otherUserInfo } = user[0];
    return res.status(200).json(otherUserInfo);
  } catch (error) {
    return res.status(404).json({ error, msg: 'User not found' });
  }
};

export const updateUser = async (req, res) => {
  const token = req.cookies.socialAppAccessToken;
  if (!token) return res.status(401).json('Not Authenticated! Please Login');

  jwt.verify(token, process.env.JWT_KEY, async (err, userInfo) => {
    if (err) res.status(403).json('Token is not valid!');

    try {
      await User.updateUser(req.body, userInfo.id);
      return res.status(200).json('User has been added udpated sucessfully!');
    } catch (error) {
      return res.status(500).json({ error, msg: 'Unable to update user' });
    }
  });
};
