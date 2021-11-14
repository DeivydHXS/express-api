const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Usuario = new Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique:true,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  token: {
    type: String
  }
});

mongoose.model('Usuario', Usuario);