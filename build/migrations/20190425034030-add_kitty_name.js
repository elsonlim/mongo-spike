module.exports = {
    up: function (db) {
        return db.collection('kittens').insertOne({ name: 'Garfield' });
    },
    down: function (db) {
        return db.collection('kittens').deleteOne({ name: 'Garfield' });
    }
};
