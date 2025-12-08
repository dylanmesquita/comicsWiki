require('dotenv').config();
const mongoose = require('mongoose');
const Character = require('../models/character');

async function deleteComp() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const result = await Character.deleteMany({ name: 'Captain American' });
    console.log('resultado:', result);
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

deleteComp();
