const express = require('express');
const router = express.Router();
var Character = require('../models/character');
require('dotenv').config();
const apiSecret = process.env.apiSectret || process.env.API_SECRET || null;

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    var characters = await Character.find();
    res.render('index', { title: 'Express', characters: characters });
  } catch (err) {
    console.error('Error fetching characters:', err);
    res.render('index', { title: 'Express', characters: [] });
  }
});

/* GET new character form. */


module.exports = router;
