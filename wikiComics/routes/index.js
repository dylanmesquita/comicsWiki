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

/* GET new character form. */
router.get('/new', function(req, res, next) {
  res.render('newCharacter', { title: 'Add New Character' });
});

module.exports = router;
