var express = require('express');

const hostname = 'localhost';
const port = 3000;

var app = express();

require('./api/index.js')(app);

app.listen(port, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});