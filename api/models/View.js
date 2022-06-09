const mongoose = require('mongoose');

const ViewSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  tasks: {
    default: [],
  },
});

module.exports = mongoose.model('Views', ViewSchema);
