import express from 'express';
import { uploadPost } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/post', uploadPost);

export default router;
