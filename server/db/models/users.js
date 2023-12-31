const {Schema, model} = require('mongoose');

// Definición del esquema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

const User = model('User', userSchema);

module.exports = User;
