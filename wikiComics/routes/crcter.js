console.log("ROUTER CRCTER: carregado (routes/crcter.js)");
const express = require("express");
const router = express.Router();
const Character = require("../models/character");

router.get("/new", function (req, res, next) {
    res.render("newCharacter", { title: "Add a new Character" })
});

// Criar novo personagem
router.post("/new", async (req, res) => {
    try {
        const charData = {
            name: req.body.name,
            description: req.body.description,
            shortDescription: req.body.shortDescription,
            poderes: req.body.poderes?.split(",") || [],
            origem: req.body.origem,
            afiliacoes: req.body.afiliacoes?.split(",") || [],
            aparicoes: req.body.aparicoes?.split(",") || [],
        };
        const char = new Character(charData);
        await char.save();
        res.redirect("/"); // Redirects to home page where list is shown
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




// Show specific character
router.get("/:id", async (req, res) => {
    try {
        const char = await Character.findById(req.params.id);
        if (!char) {
            return res.status(404).render("error", { message: "Character not found", error: { status: 404 } });
        }
        res.render("characterOn", { character: char });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving character");
    }
});

// Serve image from DB

router.get("/image/:id", async (req, res) => {
    try {
        const char = await Character.findById(req.params.id);
        if (char && char.image && char.image.data) {
            res.contentType(char.image.contentType);
            res.send(char.image.data);
        } else {
            res.status(404).send("Image not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching image");
    }
});

module.exports = router;

module.exports = router;