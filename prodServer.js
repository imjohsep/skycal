var path = require('path')
var express = require('express')
var dbConfig = require('./config')
var mongoose = require('mongoose')
var Event = require('./models/event')

/* Mongo */
mongoose.connect(dbConfig.database)
mongoose.connection.on('error', function () {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?')
})

var app = express()
app.use(express.static(path.join(__dirname, '/dist')))

/* Routes */
app.get('/api/events', function (req, res) {
  Event.find({}, function (err, events) {
    if (err) res.send([])
    res.send(events)
  })
})

app.get('/api/events/upcoming', function (req, res) {
  var now = new Date()
  Event.find({occurrence_at: {$gte: now}}).limit(4).exec(function (err, events) {
    if (err) res.send([])
    res.send(events)
  })
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.listen($PORT, 'localhost', function (err) {
  if (err) {
    console.log(err)
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', $PORT, $PORT)
})
