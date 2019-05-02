const mongoose = require('mongoose');
const Place = mongoose.model('Place');

const find = async (req, res) => {
  const { lng, lat, distance = 1 / 3963.2 } = req.query;

  const myPlaces = await Place.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], distance]
      }
    }
  }).catch((err) => {
    res.status(500).json({
      "message": "error"
    });
  });

  res.json(myPlaces);
}

const findAll = async (req, res) => {
  const myPlaces = await Place.find().catch((err) => {
    return res.status(500).json({
      "message": "error"
    });
  });

  if (!myPlaces) {
    return res.status(404).json({
      "message": "Not Found"
    })
  }
  res.json(myPlaces);
}

const create = async (req, res) => {
  const type = "Point";
  const { name, description, lng, lat } = req.body;

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
      return res.status(500).json({
        "message": err
      });
    }
    res.send(place);
  });
};

module.exports = {
  create,
  find,
  findAll
};
