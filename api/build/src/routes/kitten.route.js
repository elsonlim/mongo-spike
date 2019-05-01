var Router = require('express').Router;
var kittenController = require('../controllers/kitten.controller');
var kittenRoute = Router();
kittenRoute.get('/', kittenController.findOne);
kittenRoute.post('/', kittenController.create);
module.exports.kittenRoute = kittenRoute;
