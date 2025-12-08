console.log("ROUTER CRCTER: carregado (routes/crcter.js)");
const express = require("express");
const router = express.Router();
const Character = require("../models/character");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const upload = multer({ dest: "uploads/" });

router.get("/new", function (req, res, nest) {
    res.render("newCharacter", { title: "Add a new Character"})
});

// Criar novo personagem
router.post("/new", upload.single("image"), async (req, res) => {
    try {
        let imageUrl = "";

        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path);
            imageUrl = uploadResult.secure_url;

            fs.unlinkSync(req.file.path); // remove arquivo local
        }

        const char = new Character({
            name: req.body.name,
            description: req.body.description,
            shortDescription: req.body.shortDescription,
            poderes: req.body.poderes?.split(",") || [],
            origem: req.body.origem,
            afiliacoes: req.body.afiliacoes?.split(",") || [],
            aparicoes: req.body.aparicoes?.split(",") || [],
            imageUrl
        });

        await char.save();
        res.send("Personagem criado com sucesso!");

    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao criar personagem: " + err.message);
    }
});

console.log("ROTAS em crcter.js:");
router.stack.forEach(l => {
  if (l.route && l.route.path) {
    console.log("  verbos:", Object.keys(l.route.methods).join(","), "path:", l.route.path);
  }
});

console.log('--- DEBUG ENV in route ---');
console.log('process.env.CLOUDINARY_API_KEY present?', !!process.env.CLOUDINARY_API_KEY);
console.log('process.env.CLOUD_KEY present?', !!process.env.CLOUDINARY_API_KEY);

const cloudCfg = require('cloudinary').v2.config();
console.log('cloudinary.config() api_key present?:', !!cloudCfg.api_key);


module.exports = router;

// var express = require('express');
// var character = require('../models/character');
// var router = express.Router();
// const upload = require('../config/multer');
// const streamifier = require('streamifier');
// const cloudinary = require('cloudinary').v2

// // GET all characters (JSON API)
// router.get('/', async function (req, res) {
//     try {
//         var characters = await character.find();
//         res.json(characters);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // GET form to add new character
// router.get('/new', function (req, res) {
//     res.render('newCharacter', { title: 'Add New Character' });
// });

// // GET character by ID (JSON API)
// router.get('/:id', async function (req, res) {
//     try {
//         var found = await character.findById(req.params.id);
//         res.json(found);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// function uploadStreamToCloudinary(buffer, folder = 'characters') {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
//       if (error) return reject(error);
//       resolve(result);
//     });
//     streamifier.createReadStream(buffer).pipe(stream);
//   });
// }

// // POST new character via form
// router.post('/new', upload.single('image'), async (req, res) => {
//   try {
//     console.log('--- POST /characters/new ---');
//     console.log('req.body:', req.body);
//     console.log('req.file present:', !!req.file, req.file ? { originalname: req.file.originalname, size: req.file.size } : null);

//     // validação básica
//     if (!req.body.name || req.body.name.trim() === '') {
//       return res.status(400).send('O campo name é obrigatório.');
//     }

//     let imageUrl = '';

//     if (req.file && req.file.buffer) {
//       // tenta subir pro cloudinary
//       const result = await uploadStreamToCloudinary(req.file.buffer, 'characters');
//       console.log('Cloudinary result:', result && result.secure_url ? result.secure_url : result);
//       imageUrl = result.secure_url || result.url || '';
//     } else {
//       console.log('Nenhum arquivo enviado; salvando sem imagem.');
//     }

//     const newCharacter = new Character({
//       name: req.body.name,
//       description: req.body.description || '',
//       shortDescription: req.body.shortDescription || '',
//       poderes: req.body.poderes ? req.body.poderes.split(',').map(p => p.trim()).filter(Boolean) : [],
//       origem: req.body.origem || '',
//       afiliacoes: req.body.afiliacoes ? req.body.afiliacoes.split(',').map(a => a.trim()).filter(Boolean) : [],
//       aparicoes: req.body.aparicoes ? req.body.aparicoes.split(',').map(a => a.trim()).filter(Boolean) : [],
//       imageUrl
//     });

//     const saved = await newCharacter.save();
//     console.log('Character saved:', saved._id);
//     return res.redirect('/characters'); // ajuste conforme sua rota de listagem
//   } catch (err) {
//     console.error('ERRO AO CRIAR PERSONAGEM (stack):', err && err.stack ? err.stack : err);
//     // Em dev, enviar a mensagem completa pode ajudar — remova em produção.
//     return res.status(500).send('Erro ao criar personagem: ' + (err && err.message ? err.message : JSON.stringify(err)));
//   }
// });

// // POST new character via JSON API
// router.post('/', async function (req, res) {
//     try {
//         var newCharacter = new character(req.body);
//         await newCharacter.save();
//         res.status(201).json(newCharacter);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // DELETE character by ID
// router.delete('/:id', async function (req, res) {
//     try {
//         await character.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Character deleted' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// module.exports = router;