module.exports = {
    up: function (db) {
        return db.collection('kittens').insertOne({ name: 'The Beatles' });
    },
    down: function (db) {
        return db.collection('kittens').deleteOne({ name: 'The Beatles' });
    }
};
