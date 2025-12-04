var mongoose = require('mongoose');

var characterSchema = new mongoose.Schema({
    name: String,
    poderes: [String],
    origem: String,
    afiliacoes: [String],
    aparicoes: [String],
    imagem: String
});

module.exports = mongoose.model('Character', characterSchema);