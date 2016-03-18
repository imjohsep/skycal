var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.config.dev')
var historyApiFallback = require('connect-history-api-fallback')
var dbConfig = require('./config')
var mongoose = require('mongoose')
var Event = require('./models/event')

/* Mongo */
mongoose.connect(dbConfig.database)
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?')
})

var app = express()

/* Routes */
app.get('/api/events', function(req, res) {
  Event.find({}, function(err, events) {
    res.send(events)
  })
})

app.get('/api/events/upcoming', function(req, res) {
  var now = new Date();
  Event.find({occurrence_at: {$gte: now}}).limit(4).exec(function(err, events) {
    res.send(events)
  });
})

/* Webpack Middleware */
var compiler = webpack(config)

app.use(historyApiFallback()) // required

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'src',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
}))

app.use(historyApiFallback()) // required duplicate

app.use(require('webpack-hot-middleware')(compiler))

app.use(express.static(path.join(__dirname, '/dist')))

app.listen(config._hotPort, 'localhost', function (err) {
  if (err) {
    console.log(err)
  }
  console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', config._hotPort, config._hotPort)
})
