import {Router} from 'express';
import placeController from '../controllers/place.controller';

const placeRoute = Router();

placeRoute.post('/', placeController.create);
placeRoute.get('/', placeController.findAll);

module.exports.placeRoute = placeRoute;