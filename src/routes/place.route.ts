import {Router} from 'express';
import placeController from '../controllers/place.controller';

const placeRoute = Router();

placeRoute.post('/', placeController.create);
placeRoute.get('/', placeController.find);

module.exports.placeRoute = placeRoute;