var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/app/todolist', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      return;
    }

    if (data === '') {
      res.status(200).json([]);
    } else {
      res.status(200).json(JSON.parse(data).lists);
    }
  });
});

app.post('/app/todolist', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      return;
    }

    let newData = {index: 0, lists: []};
    if (data !== '') {
      newData = JSON.parse(data);
    }

    newData.lists.push({value: req.body.value, static: false, index: newData.index});
    newData.index++;

    fs.writeFile('./data.json', JSON.stringify(newData), (err, data) => {
      return;
    });

    res.status(201).json(newData.lists);
  });
});

app.delete('/app/todolist', (req,res) => {
  fs.readFile('./data.json', 'utf8', function (err, data) {
    if(err){
      return;
    }
    let newData = {index: 0, lists: []};

    if (data != '') {
      newData = JSON.parse(data);
      for(let i = 0; i < newData.lists.length ; i++) {
        if(newData.lists[i].index === parseInt(req.body.index)){
          newData.lists.splice(i, 1);
          break;
        }
      }
    }
    fs.writeFile('./data.json', JSON.stringify(newData), function (err) {
      return;
    });
    res.status(200).json(newData.lists);
  });
});

app.put('/app/todolist', (req, res) => {
  fs.readFile('./data.json', 'utf8', function (err, data) {
    if(err){
      return;
    }
    let newData = {index: 0, lists: []};

    if (data != '') {
      newData = JSON.parse(data);
      for(let i = 0; i < newData.lists.length ; i++) {
        if(newData.lists[i].index === parseInt(req.body.index)){
          newData.lists[i].static = !newData.lists[i].static;
          break;
        }
      }
    }
    fs.writeFile('./data.json', JSON.stringify(newData), function (err) {
      return;
    });
    res.status(200).json(newData.lists);
  });
});

app.listen(3001, () => {
  console.log('Server start');
});