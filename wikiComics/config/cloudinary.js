require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Debug seguro - mostra apenas presença, não valores sensíveis
const cfg = cloudinary.config();
console.log('config/cloudinary.js -> cloud_name:', cfg.cloud_name);
console.log('config/cloudinary.js -> api_key present?:', !!cfg.api_key);
console.log('config/cloudinary.js -> api_secret present?:', !!cfg.api_secret);

module.exports = cloudinary;
