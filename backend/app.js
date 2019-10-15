var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

const variables = require("./config/variables");

var app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (!fs.existsSync(`./${variables.uploadsFolder}`)){
    fs.mkdirSync(`./${variables.uploadsFolder}`);
}
app.use(`/${variables.uploadsFolder}`, express.static(`${variables.uploadsFolder}`));

require('./api/index.js')(app);

app.listen(variables.port, function () {
  console.log(`Server running at http://${variables.hostname}:${variables.port}/`);
});
