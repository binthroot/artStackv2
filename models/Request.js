const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  requestName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Object,
  },
  sku: {
    type: String,
  },
  descriptionText: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  userName: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Backlog', 'To-Do', 'In-Progress', 'Completed'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Request', RequestSchema);