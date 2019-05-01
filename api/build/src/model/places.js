"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./db");
var mongoose_1 = __importDefault(require("mongoose"));
/*
{
  "name": "Nylon",
  "description": "expensive coffee",
  "type" : "Point",
  "coordinates" : [-122.5, 37.7]
}
*/
var placeSchema = new mongoose_1.default.Schema({
    name: String,
    description: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});
placeSchema.index({ location: "2dsphere" });
mongoose_1.default.model('Place', placeSchema);
