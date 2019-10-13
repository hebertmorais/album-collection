var express = require('express');
var bodyParser = require('body-parser');

const variables = require("./config/variables");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(`/${variables.uploadsFolder}`, express.static(`${variables.uploadsFolder}`));

require('./api/index.js')(app);

app.listen(variables.port, function () {
  console.log(`Server running at http://${variables.hostname}:${variables.port}/`);
});