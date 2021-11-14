const express = require('express');
const routes = express.Router();
const produtos = require('./controllers/produtos');
const usuarios = require('./controllers/usuarios');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, "secret", function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      req.userId = decoded.id;
      next();
    });
}

function verificarAdmin(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, "secret", async function(err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        
        req.userId = decoded.id;
        const usuario = await Usuario.findOne({ _id: req.userId });
        if(usuario.admin == false) {
            return res.status(401).json({ message: 'Não é admin' });
        }
        next();
    });
}

routes.get('/produtos', produtos.find);
routes.get('/produtos/:categoria', produtos.filtrarCategoria);
routes.post('/produtos', verificarAdmin, produtos.create);
routes.put('/produtos', verificarAdmin, produtos.update);
routes.delete('/produtos', verificarAdmin, produtos.delete);


routes.post('/usuarios/login', usuarios.login);
routes.post('/usuarios/logout', usuarios.logout);
routes.get('/usuarios', usuarios.find);
routes.post('/usuarios', usuarios.create);
routes.put('/usuarios', verifyJWT, usuarios.update);

module.exports = routes;