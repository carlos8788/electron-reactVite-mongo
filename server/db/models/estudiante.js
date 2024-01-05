const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const User = require('./users')


const estudianteSchema = new Schema({
    matricula: {
        type: String,
        required: true
    },
    carrera: {
        type: String,
        required: true
    },

});

const Estudiante = User.discriminator('Estudiante', estudianteSchema);

module.exports = Estudiante