require('./model');
var port = 5000;
var app = require('./routes').app;
app.listen(port, function () { return console.log("Example app listening on port " + port + "!"); });
