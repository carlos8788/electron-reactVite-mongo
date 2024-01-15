const { Schema, model } = require('mongoose');

const turnoSchema = new Schema({
  paciente: {
    type: Schema.Types.Mixed,
    ref: 'User',
    required: false
  },
  diagnostico: {
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
});

const Turno = model('Turno', turnoSchema);

module.exports = Turno;
