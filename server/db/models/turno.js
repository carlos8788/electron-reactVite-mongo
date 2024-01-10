const { Schema, model } = require('mongoose');

const turnoSchema = new Schema({
  paciente: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
