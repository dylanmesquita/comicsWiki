var express = require('express');
var router = express.Router();
var Character = require('../models/character');

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

module.exports = router;
