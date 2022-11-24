import cloudinary from '../config/cloudinary.js';

export const uploadPost = async (req, res) => {
  try {
    const file = JSON.parse(req.body.data);
    const uploadedResponse = await cloudinary.uploader.upload(file, {
      upload_preset: 'SA_posts',
    });
    res.status(200).json(uploadedResponse.public_id);
  } catch (error) {
    res.status(500).json({ error, msg: 'unable to upload image' });
  }
};
