"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var place_controller_1 = __importDefault(require("../controllers/place.controller"));
var placeRoute = express_1.Router();
placeRoute.post('/', place_controller_1.default.create);
placeRoute.get('/', place_controller_1.default.findAll);
placeRoute.get('/near', place_controller_1.default.findNearBy);
module.exports.placeRoute = placeRoute;
