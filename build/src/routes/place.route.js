"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var kittenRoute = express_1.Router();
kittenRoute.post('/', kittenController.create);
module.exports.kittenRoute = kittenRoute;
