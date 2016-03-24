var Event = require('./models/event')
/* Routes */
module.exports = function(app) {
  app.get('/api/events', function (req, res) {
    Event.find({}, function (err, events) {
      if (err) res.send([])
      res.send(events)
    })
  })

  app.get('/api/events/upcoming', function (req, res) {
    var now = new Date()
    var end_range = new Date()
    end_range.setDate(end_range.getDate() + 7)
    Event.find({occurrence_at: {$gte: now, $lte: end_range}}).sort('occurrence_at').limit(5).exec(function (err, events) {
      if (err) res.send([])
      res.send(events)
    })
  })
}
