module.exports = {
  up(db) {
    return db.collection('kittens').insertOne({name: 'Garfield'});
  },

  down(db) {
    return db.collection('kittens').deleteOne({name: 'Garfield'});
  }
};
