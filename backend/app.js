var express = require('express');
var bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./api/index.js')(app);

app.listen(port, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});