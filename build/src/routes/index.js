var express = require('express');
var Router = require('express').Router;
var bodyParser = require('body-parser');
var kittenRoute = require('./kitten.route').kittenRoute;
var router = Router();
router.use('/api/kitten', kittenRoute);
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.get('/', function (req, res) { return res.send('Hello!'); });
module.exports.app = app;
