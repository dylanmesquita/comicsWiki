const Character = require("../models/character");

exports.getAllCharacters = async (req, res) => {
    try {
        const characters = await Character.find();
        res.render("index", { characters });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao carregar personagens");
    }
};
