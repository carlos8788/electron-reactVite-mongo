const { Schema, model } = require('mongoose');

const obraSocialSchema = new Schema({
  telefono: {
    type: String,
  },
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  direccion: {
    type: String,
  },
  padron: {
    type: String,
    default: 'Padrón A'
  }
});

const ObraSocial = model('ObraSocial', obraSocialSchema);

module.exports = ObraSocial;
