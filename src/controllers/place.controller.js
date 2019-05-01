const mongoose = require('mongoose');
const Place = mongoose.model('Place');

/*
{
  "name": "Hotel Boss",
  "description": "Hotel",
  "lng": 103.860463,
  "lat": 1.306027
}
{
  "name": "Potato Head",
  "description": "three bun",
  "lng": 103.841765,
  "lat": 1.280630
}
*/
const find = async (req, res) => {
  const {lng, lat, distance = 1/3963.2} = req.query;
  
  console.log("###", lng, lat, distance);
  // boss hotel { lat 1.306027, long103.860463
  const myPlaces = await Place.find({
    location: {
      $geoWithin: { 
        $centerSphere: [ [ lng, lat ], distance ] 
      }
    }
  }).catch((err) => {
    console.log("error on fetch", err);
    res.status(500).json({
      "message": "error"
    });
  });

  console.log("myPlaces", myPlaces);
  if(!myPlaces) {
    res.status(404).json({
      "message": "Not Found"
    })
  }
  res.json(myPlaces);
}

const create = async (req, res) => {
  const type = "Point";
  const {name, description, lng, lat} = req.body; 

  const myPlace = new Place({
    name,
    description,
    location: {
      type,
      coordinates: [lng, lat]
    }
  });

  myPlace.save((err, place) => {
    if (err) {
      res.status(500).json({
        "message": err
      });
    }
    res.send(place);
  });
};

module.exports = {
  create,
  find
}