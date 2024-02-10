const { Schema, model } = require('mongoose');

const notaSchema = new Schema({
  paciente: {
    type: Schema.Types.Mixed,
    ref: 'User',
    required: false
  },
  telefono: {
    type: String,
  },
  hora: {
    type: String,
    required: true,
  },
  fecha: {
    type: String,
    required: true,
  },
  texto: {
    type: String,
    required: true
  }
});

const Nota = model('Nota', notaSchema);

module.exports = Nota;
