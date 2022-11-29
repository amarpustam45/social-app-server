import express from 'express';
import {
  uploadPost,
  uploadCover,
  uploadProfile,
} from '../controllers/uploadController.js';

const router = express.Router();

router.post('/post', uploadPost);
router.post('/cover', uploadCover);
router.post('/profile', uploadProfile);

export default router;
