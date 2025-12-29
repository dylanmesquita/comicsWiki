require('dotenv').config();
var mongoose = require('mongoose');
var Character = require('./models/character');
// var testCharacter = new Character({
//   name: 'Captain American',
//   shortDescription: 'A superhuman with super strengh.',
//   description: 'Peter Parker, a high school student bitten by a radioactive spider, gains superhuman abilities including wall-crawling, enhanced strength, and a sixth sense for danger. Adopting the alter ego Spider-Man, he fights crime in New York City while balancing the challenges of teenage life. Known for his witty humor and iconic red-and-blue costume.',
//   poderes: ['Wall crawling', 'Super strength', 'Web shooting', 'Spider sense'],
//   origem: 'New York',
//   afiliacoes: ['Avengers', 'Defenders'],
//   aparicoes: ['Amazing Spider-Man', 'Marvel Team-Up'],
//   imageUrl: ''

// });

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Conectado ao mongoDB');


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

