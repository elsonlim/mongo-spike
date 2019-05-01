const {Router} = require('express');
const kittenController = require('../controllers/kitten.controller');

const kittenRoute = Router();

kittenRoute.get('/', kittenController.findOne);
kittenRoute.post('/', kittenController.create);

module.exports.kittenRoute = kittenRoute;