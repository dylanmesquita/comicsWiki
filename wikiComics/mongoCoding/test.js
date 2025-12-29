require('dotenv').config();
var mongoose = require('mongoose');
var Character = require('../models/character');

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Conectado ao mongoDB');
  Character.db.find().then(characters => {
    console.log('Personagens:', characters);
    mongoose.connection.close();
  }).catch(err => {
    console.error('Erro ao buscar personagens:', err);
    mongoose.connection.close();
  });
}).catch(err => {
  console.error('Erro ao tentar conectar com MongoDB:', err);
});