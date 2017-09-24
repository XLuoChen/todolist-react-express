var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded());

app.use(express.static(__dirname + '/public'));

app.listen(3001, () => {
  console.log('Server start');
});