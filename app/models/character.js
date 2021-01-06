const mongoose = require('mongoose')

const characterSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
  type: String,
  required: false
  },
  homeBase: {
    type: String,
    required: false
  },
  race: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
    timestamps: true
})

module.exports = mongoose.model('Character', characterSchema)
