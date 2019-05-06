const mongoose = require('mongoose');

const mongoOptions = {
  useNewUrlParser: true
};

if (process.env.MONGO_INITDB_ROOT_USERNAME && process.env.MONGO_INITDB_ROOT_PASSWORD) {
  mongoOptions.user = process.env.MONGO_INITDB_ROOT_USERNAME;
  mongoOptions.pass = process.env.MONGO_INITDB_ROOT_PASSWORD;
}
mongoose.connect(`${process.env.dbUrl}`, mongoOptions);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("connected to mongodb");
});