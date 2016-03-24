var path = require('path')
var express = require('express')
var dbConfig = require('./config')
var mongoose = require('mongoose')

/* Mongo */
mongoose.connect(dbConfig.database)
mongoose.connection.on('error', function () {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?')
})

var app = express()
var port = process.env.PORT || 8000
require('./router')(app);

app.use(express.static(path.join(__dirname, '/dist')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.listen(port, function (err) {
  if (err) {
    console.log(err)
  }
  console.info('==> 🌎 Listening on port %s.', port)
})
