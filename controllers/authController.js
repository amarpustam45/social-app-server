import Auth from '../models/Auth.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

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
    console.error(error);
  }
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
