var _ = require('lodash')
var Event = require('./models/event')

/* Utils */

// Group events by year-month-day key
function groupEvents(events) {
  var grouping = {}

  _.map(events, function(event) {
    var key = event._id.date.year + '-' + event._id.date.month + '-' + event._id.date.day

    if (grouping[key] === undefined) {
        grouping[key] = []
    }

    grouping[key].push(event._id)
  })

  return grouping
}

/* Routes */


module.exports = function (app) {
  // Events
  app.get('/api/events', function (req, res) {
    Event.find({}, function (err, events) {
      if (err) res.send([])
      res.send(events)
    })
  })

  // Upcoming Events
  app.get('/api/events/upcoming', function (req, res) {
    var now = new Date()
    var end_range = new Date()
    end_range.setDate(end_range.getDate() + 7)
    Event.find({occurrence_at: {$gte: now, $lte: end_range}}).sort('occurrence_at').limit(4).exec(function (err, events) {
      if (err) res.send([])
      res.send(events)
    })
  })

  // Grouped Events
  app.get('/api/events/grouped', function (req, res) {
    Event.aggregate({
      $group: {
        _id: {
          date: {
            year: {$year: "$occurrence_at"},
            month: {$month: "$occurrence_at"},
            day: {$dayOfMonth: "$occurrence_at"}
          },
          occurrence_at: "$occurrence_at",
          description: "$description",
          uid: "$_id"
        },
      }
    }, {
      $sort: {
        "_id.date.year": 1,
        "_id.date.month": 1,
        "_id.date.day": 1,
      }
    }).exec(function (err, events) {
      if (err) res.send({'error': err})

      var groupedEvents = {}
      _.map(events, function(event) {
        var key = event._id.date.year + '-' + event._id.date.month + '-' + event._id.date.day

        if (groupedEvents[key] === undefined) {
            groupedEvents[key] = []
        }

        groupedEvents[key].push(event._id)
      })

      res.send(groupedEvents)
    })
  })
}
