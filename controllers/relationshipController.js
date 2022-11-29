import Relationship from '../models/Relationships.js';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const getRelationship = async (req, res) => {
  try {
    const [relationships, _] = await Relationship.getAllRelationships(
      req.query.followedUserId
    );
    return res.status(200).json(
      relationships.map((relationship) => {
        return relationship.followerUserId;
      })
    );
  } catch (error) {
    return res.status(500).json({ error, msg: 'Unable to get relationships' });
  }
};

export const addRelationship = async (req, res) => {
  const token = req.cookies.socialAppAccessToken;
  if (!token) return res.status(401).json('Not Authenticated! Please Login');

  jwt.verify(token, process.env.JWT_KEY, async (err, userInfo) => {
    if (err) res.status(403).json('Token is not valid!');

    try {
      await Relationship.addRelationship(req.body.userId, userInfo.id);
      return res.status(200).json('Relationship has been added sucessfully!');
    } catch (error) {
      return res.status(500).json({ error, msg: 'Unable to add relationship' });
    }
  });
};

export const deleteRelationship = async (req, res) => {
  const token = req.cookies.socialAppAccessToken;
  if (!token) return res.status(401).json('Not Authenticated! Please Login');

  jwt.verify(token, process.env.JWT_KEY, async (err, userInfo) => {
    if (err) res.status(403).json('Token is not valid!');

    try {
      await Relationship.deleteRelationship(req.query.userId, userInfo.id);
      return res.status(200).json('Relationship has been added deleted!');
    } catch (error) {
      return res
        .status(500)
        .json({ error, msg: 'Unable to remove relationship' });
    }
  });
};
