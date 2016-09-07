var mongoose = require('mongoose')

var eventSchema = new mongoose.Schema({
  id: { type: Number, unique: true, index: true },
  occurrence_at: Date,
  description: String,
  type: String
})

module.exports = mongoose.model('Event', eventSchema)
