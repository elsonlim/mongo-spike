var mongoose = require('mongoose');
var mongoOptions = {
    useNewUrlParser: true
};
if (process.env.MONGO_INITDB_ROOT_USERNAME && process.env.MONGO_INITDB_ROOT_PASSWORD) {
    mongoOptions.user = process.env.MONGO_INITDB_ROOT_USERNAME;
    mongoOptions.pass = process.env.MONGO_INITDB_ROOT_PASSWORD;
}
mongoose.connect("" + process.env.dbUrl, mongoOptions);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connected to mongodb");
});
