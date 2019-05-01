import {Router} from 'express';
import placeController from '../controllers/place.controller';

const kittenRoute = Router();

kittenRoute.post('/', kittenController.create);

module.exports.kittenRoute = kittenRoute;