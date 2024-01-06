const { Schema, model } = require('mongoose');

// Definición del esquema
const userSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true
  },
  observaciones: {
    type: String,
  },
  hora: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  obraSocial: {
    type: Schema.Types.ObjectId,
    ref: 'ObraSocial', // Esto debe coincidir con el nombre que le diste al modelo de obra social
    required: true
  },
  dni: {
    type: Number,
    required: true,
    unique: true
  },
  edad: {
    type: Number,
    required: true,
  },
  fechaNac: {
    type: String,
    required: true,
  }

});

const User = model('User', userSchema);

module.exports = User;
