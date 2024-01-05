const { Schema, model } = require('mongoose');

const obraSocialSchema = new Schema({
  telefono: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  }
});

const ObraSocial = model('ObraSocial', obraSocialSchema);

module.exports = ObraSocial;
