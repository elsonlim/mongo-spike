module.exports = {
  up(db) {
    return db.collection('kittens').insertOne({name: 'The Beatles'});
  },

  down(db) {
    return db.collection('kittens').deleteOne({name: 'The Beatles'});
  }
};
