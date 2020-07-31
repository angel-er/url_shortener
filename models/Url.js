const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const urlSchema = new Schema({
  urlOriginal: {
    type: String,
    lowercase: true,
    trim: true,
    required: 'Agrega una URL',
  },
  shortUrl: {
    type: String,
  },
});

// Metodo de mongoose
urlSchema.pre('save', async function (next) {
  // Generar la Url corta
  this.shortUrl = shortid.generate();
  next();
});

module.exports = mongoose.model('Urls', urlSchema);
