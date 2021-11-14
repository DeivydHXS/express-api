const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://db-user:LZYXtzNMSQpUEbB5@blogapp-prod.who5i.mongodb.net/blogapp-prod?retryWrites=true&w=majority", {
}).catch(err => console.log("Houve um erro ao se conectar ao MongoDB: " + err));


const routes = require('./routes');

app.use('/api', routes);

const port = 1337;
app.listen(port, () => console.log("Go to the moon!"));