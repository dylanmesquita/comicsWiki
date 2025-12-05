require('dotenv').config();
var mongoose = require('mongoose');
var Character = require('./models/character');

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Conectado ao mongoDB');
  
  var testCharacter = new Character({
    name: 'Spider-Man',
    shortDescription: 'A superhero with spider-like abilities.',
    description: 'Peter Parker, a high school student bitten by a radioactive spider, gains superhuman abilities including wall-crawling, enhanced strength, and a sixth sense for danger. Adopting the alter ego Spider-Man, he fights crime in New York City while balancing the challenges of teenage life. Known for his witty humor and iconic red-and-blue costume.',
    poderes: ['Wall crawling', 'Super strength', 'Web shooting', 'Spider sense'],
    origem: 'New York',
    afiliacoes: ['Avengers', 'Defenders'],
    aparicoes: ['Amazing Spider-Man', 'Marvel Team-Up'],
    imageUrl: 'https://imgs.search.brave.com/QaxYnzpIBXR4l7Ci6cGlzT8SJrEmdrtQImb5TqtApyw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2U3L2Vk/LzBkL2U3ZWQwZDBm/YzZkNTBhMmFhYmE2/YzBmMjUzNTA5NGZm/LmpwZw'
  });

  testCharacter.save().then(() => {
    console.log('Personagem adicionado com sucesso!');
    mongoose.connection.close();
  }).catch(err => {
    console.error('Erro ao tentar salvar:', err);
    mongoose.connection.close();
  });
}).catch(err => {
  console.error('Erro ao tentar conectar com MongoDB:', err);
});

