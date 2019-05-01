require('./model/db');
const port = 5000;
const {app} = require('./routes');
app.listen(
  port, 
  () => console.log(`Example app listening on port ${port}!`)
);