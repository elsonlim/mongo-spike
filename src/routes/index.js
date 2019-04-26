const express = require('express'); 
const {Router} = require('express');
const bodyParser = require('body-parser');
require('../model/kittens');
const {kittenRoute} = require('./kitten.route');

const router = Router();
router.use('/api/kitten', kittenRoute);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(router);
app.get('/', (req, res) => {
  res.json({ "message": "Hello!"});
});

module.exports.app = app;

