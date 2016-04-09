var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.config.dev')
var historyApiFallback = require('connect-history-api-fallback')
var dbConfig = require('./config')
var mongoose = require('mongoose')

/* Mongo */
mongoose.connect(dbConfig.database)
mongoose.connection.on('error', function () {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?')
})

var app = express()
require('./router')(app)

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
