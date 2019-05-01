import "./db";
import mongoose from 'mongoose';

/*
{
  "name": "Nylon",
  "description": "expensive coffee",
  "type" : "Point",
  "coordinates" : [-122.5, 37.7]
}
*/
const placeSchema = new mongoose.Schema({
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

mongoose.model('Place', placeSchema);