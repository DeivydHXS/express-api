require("../models/Usuario");
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

const jwt = require('jsonwebtoken');

module.exports = {
    async login(req, res) {
        await Usuario.findOne({ email: req.body.email, senha: req.body.senha })
        .then(async (usuario) => {
            const id = usuario._id.toString();
            const token = jwt.sign({ id }, 'secret', {expiresIn: '2000s'});
            await Usuario.updateOne({ _id: usuario._id }, { token });
            res.json({ auth: true, token });
        })
        .catch((err) => {
            console.log(err);
            res.json({ err: "Login invalido." });
        });
    },

    async logout(req, res) {
        await Usuario.updateOne({ _id: req.body.id }, { token: null });
        res.json({ auth: false, token: null });
    },

    async find(req, res) {
        await Usuario.find()
        .then((usuarios) => {
            res.json(usuarios);
        })
        .catch((err) => {
            console.log(err);
            res.json({ err: "Não foi possivel encontrar usuarios."});
        });
    },

    async create(req, res) {
        await Usuario.create({
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        })
        .then((usuario) => {
            res.json(usuario);
        })
        .catch((err) => {
            res.json(err);
        });
    },

    async update(req, res) {
        await Usuario.updateOne({ _id: req.body.id }, {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            admin: req.body.admin
        })
        .then((usuario) => {
            res.json(usuario);
        })
        .catch((err) => {
            res.json(err);
        });
    }
};