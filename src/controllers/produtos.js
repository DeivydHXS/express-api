require("../models/Produto");
const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');

module.exports = {
    async find(req, res) {
        await Produto.find()
        .then((produtos) => {
            res.json(produtos);
        })
        .catch((err) => {
            res.json(err);
        });
    },

    async filtrarCategoria(req, res) {
        await Produto.find({ categoria: req.params.categoria })
        .then((produto) => {
            res.json(produto);
        })
        .catch((err) => {
            res.json(err);
        });
    },

    async create(req, res) {
        await Produto.create({
            nome: req.body.nome,
            preco: req.body.preco,
            categoria: req.body.categoria
        })
        .then((produto) => {
            res.json(produto);
        })
        .catch((err) => {
            res.json(err);
        });
    },

    async update(req, res) {
        await Produto.updateOne({ _id: req.body.id }, {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        })
        .then((produto) => {
            res.json(produto);
        })
        .catch((err) => {
            res.json(err);
        });
    },

    async delete(req, res) {
        await Produto.deleteOne({ _id: req.body.id })
        .then(() => {
            res.json({ delete: "Success" });
        })
        .catch((err) => {
            res.json({ delete: "Failure", err });
        });
    }
};