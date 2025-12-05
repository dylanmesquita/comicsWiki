var mongoose = require('mongoose');

var characterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    shortDescription: String,
    poderes: [String],
    origem: String,
    afiliacoes: [String],
    aparicoes: [String],
    imageUrl: String
});

module.exports = mongoose.model('Character', characterSchema);