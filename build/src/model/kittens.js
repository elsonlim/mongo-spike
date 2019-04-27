require("./db");
var mongoose = require('mongoose');
var kittySchema = new mongoose.Schema({
    name: String
});
kittySchema.methods.speak = function () {
    var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
};
mongoose.model('Kitten', kittySchema);
/// creating new kitten
// var fluffy = new Kitten({ name: 'fluffy' });
// fluffy.speak(); // "Meow name is fluffy"
// fluffy.save(function (err, fluffy) {
//   if (err) return console.error(err);
//   fluffy.speak();
// });
