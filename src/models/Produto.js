const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Produto = new Schema({
  nome: {
    type: String,
    required: true
  },
  preco: {
    type: Number,
    required: true
  },
  categoria: {
    type: String
  },
  imagem: {
    type: String,
    required: false
  }
});

mongoose.model('Produto', Produto);