const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categoria = new Schema({
  nome: {
    type: String,
    required: true
  },
  produtos: [{
    type: Schema.Types.ObjectId,
    ref: 'Produto'
  }]
});

mongoose.model('Categoria', Categoria);