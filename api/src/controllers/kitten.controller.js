const mongoose = require('mongoose');
const Kitten = mongoose.model('Kitten');

const findOne = async (req, res, next) => {
  const name = req.query.name;

  if(!name) {
    return res.status(404).json({
      "message": "missing kitten name"
    });
  }
  const myKitten = await Kitten.findOne({name}).catch((err) => {
    return res.status(404).json({
      "message": "error"
    });
  });

  if(!myKitten) {
    return res.status(404).json({
      "message": "not found"
    });
  };
  res.send(myKitten);
}

const create = async (req, res) => {
  const name = req.body.name; 
 
  const myKitten = new Kitten({ name });

  myKitten.save((err, kitten) => {
    if (err) {
      res.status(500).json({
        "message": err
      });
    }
    kitten.speak();
    res.send(myKitten)
  });
};

module.exports = {
  create,
  findOne
}