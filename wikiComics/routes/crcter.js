var express = require('express');
var character = require('../models/character');
var router = express.Router();

// GET all characters (JSON API)
router.get('/', async function (req, res) {
    try {
        var characters = await character.find();
        res.json(characters);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET form to add new character
router.get('/new', function (req, res) {
    res.render('newCharacter', { title: 'Add New Character' });
});

// GET character by ID (JSON API)
router.get('/:id', async function (req, res) {
    try {
        var found = await character.findById(req.params.id);
        res.json(found);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new character via form
router.post('/new', async (req, res) => {
    try {
        const newCharacter = new character({
            name: req.body.name,
            description: req.body.description,
            shortDescription: req.body.shortDescription,
            poderes: req.body.poderes ? req.body.poderes.split(',').map(p => p.trim()) : [],
            origem: req.body.origem,
            afiliacoes: req.body.afiliacoes ? req.body.afiliacoes.split(',').map(a => a.trim()) : [],
            aparicoes: req.body.aparicoes ? req.body.aparicoes.split(',').map(a => a.trim()) : [],
            imageUrl: req.body.imageUrl
        });

        await newCharacter.save();
        res.redirect('/'); 
        console.log('Personagem salvo com sucesso! \nNome:', newCharacter.name);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao salvar personagem.");
    }
});

// POST new character via JSON API
router.post('/', async function (req, res) {
    try {
        var newCharacter = new character(req.body);
        await newCharacter.save();
        res.status(201).json(newCharacter);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE character by ID
router.delete('/:id', async function (req, res) {
    try {
        await character.findByIdAndDelete(req.params.id);
        res.json({ message: 'Character deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;