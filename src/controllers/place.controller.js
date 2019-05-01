const mongoose = require('mongoose');
const Place = mongoose.model('Place');

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
  findOne
}