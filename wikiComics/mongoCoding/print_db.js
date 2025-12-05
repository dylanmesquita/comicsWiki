require('dotenv').config();
const mongoose = require('mongoose');
const Character = require('../models/character');

async function printAll() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const characters = await Character.find().lean();
    console.log(JSON.stringify(characters, null, 2));
  } catch (err) {
    console.error('Error fetching characters:', err);
  } finally {
    await mongoose.disconnect();
  }
}

printAll();
// const Character = require('../models/character');

// Character.find()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => console.error(err));
