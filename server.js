'use script';
const fs = require('fs');
const path = require('path');
const express = require('express');
const proxy = require('proxy-middleware');
const url = require('url');
const open = require('open');
const bodyParser = require('body-parser');
const config = require('./webpack.config');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');


//----------------PROXY----------------
var app = express();

app.use('/assets', proxy(url.parse('http://localhost:8081/assets')));

app.get('/api/calendar/upcoming', function(req, res) {
  // fs.readFile('./2016.json', 'utf8', function (err, data) {
  //       if (err) throw err;
  //       res.json(JSON.parse(data));
  //   });
  res.json({'herp': 'derp'});
});

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

//---------------WEBPACK---------------
new WebpackDevServer(webpack(config))
.listen(config.port, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:' + config.port);
  console.log('Opening your system browser...');
  open('http://localhost:8080');
});

app.listen(8080);