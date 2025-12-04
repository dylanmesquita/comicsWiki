var express = require('express');
var character = require('../models/character');
var router = express.Router();

router.get('/', async function (req, res) {
    try {
        var characters = await character.find();
        res.json(characters);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async function (req, res) {
    try {
        var found = await character.findById(req.params.id);
        res.json(found);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async function (req, res) {
    try {
        var newCharacter = new character(req.body);
        await newCharacter.save();
        res.status(201).json(newCharacter);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async function (req, res) {
    try {
        await character.findByIdAndDelete(req.params.id);
        res.json({ message: 'Character deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;