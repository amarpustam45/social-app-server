import Auth from '../models/Auth.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

export const register = async (req, res) => {
  try {
    let { username, email, password, name } = req.body;

    // hash the user password
    bcrypt.hash(password, 10, async (err, hash) => {
      let auth = new Auth(username, email, hash, name);

      //check if the user already exists
      let [user, _] = await Auth.checkExisting(username, email);
      if (user.length) return res.status(409).json('User already exists!');

      //save the new user to the database
      auth = await auth.save();
      return res.status(200).json('User has been created');
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  let { username, password } = req.body;

  try {
    //check if the user exists
    let [user, _] = await Auth.checkExisting(username, username);
    if (user.length === 0) return res.status(404).json('User not found!');

    //check the hashed password with the user entered password
    bcrypt.compare(password, user[0].password, (err, result) => {
      if (!result)
        return res.status(400).json('Username or Password incorrect!');

      const token = jwt.sign({ id: user[0].id }, process.env.JWT_KEY);
      const { password, ...others } = user[0];

      //set the user information as a cookie to be used by other processes
      res
        .cookie('socialAppAccessToken', token, {
          maxAge: 900000,
          sameSite: 'none',
          secure: true,
          httpOnly: true,
        })
        .status(200)
        .json(others);
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const logout = (req, res) => {
  res
    .clearCookie('socialAppAccessToken', {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    })
    .status(200)
    .json('User has been logged out');
};
