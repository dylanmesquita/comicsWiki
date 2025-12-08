var express = require('express');
var router = express.Router();
var Character = require('../models/character');
require('dotenv').config();
const apiSecret = process.env.apiSectret || process.env.API_SECRET || null;

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    var characters = await Character.find();
    res.render('index', { title: 'Express', characters: characters });
  } catch (err) {
    console.error('Error fetching characters:', err);
    res.render('index', { title: 'Express', characters: [] });
  }
});

/* GET new character form. */
router.get('/new', function(req, res, next) {
  res.render('newCharacter', { title: 'Add New Character' });
});

import { v2 as cloudinary } from 'cloudinary';

(async function() {

    // Configuration
    cloudinary.config({ 
      cloud_name: 'dbr5ggi2b', 
      api_key: '181336531171968', 
      api_secret: apiSecret 
    });
    console.log('Cloudinary API secret present:', !!apiSecret);
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();
module.exports = router;
