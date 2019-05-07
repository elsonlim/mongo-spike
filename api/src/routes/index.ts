const express = require('express'); 
const {Router} = require('express');
const bodyParser = require('body-parser');
require('../model/kittens');
import '../model/places';
const {kittenRoute} = require('./kitten.route');
const {placeRoute} = require('./place.route');

const router = Router();
router.use('/api/kitten', kittenRoute);
router.use('/api/place', placeRoute);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(router);
app.get('/api', (req, res) => {
  res.json({ "message": "Hello!"});
});

module.exports.app = app;

