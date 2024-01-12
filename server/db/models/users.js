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
  telefono: {
    type: String,
    required: true,
  },
  obraSocial: {
    type: Schema.Types.ObjectId || undefined,
    ref: 'ObraSocial', 
  },
  dni: {
    type: String,
    required: true,
    unique: true
  },
  edad: {
    type: String,
  },
  fechaNacimiento: {
    type: String,
    default: '2024-01-01'
  }

});

const User = model('User', userSchema);

module.exports = User;
