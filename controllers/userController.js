import User from '../models/User.js';

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
