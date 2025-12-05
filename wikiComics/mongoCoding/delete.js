require('dotenv').config();
const mongoose = require('mongoose');
const Character = require('../models/character');

async function deleteSpideys() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const result = await Character.deleteMany({ name: 'Spider-Man' });
    console.log('deleteMany result:', result);
  } catch (err) {
    console.error('Error deleting Spider-Man entries:', err);
  } finally {
    await mongoose.disconnect();
  }
}

deleteSpideys();
