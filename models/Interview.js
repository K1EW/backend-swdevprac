const mongoose = require('mongoose');

// Interview Schema
const interviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  date: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        const startDate = new Date('2022-05-10');
        const endDate = new Date('2022-05-13');
        return value >= startDate && value <= endDate;
      },
      message: 'Interviews can only be scheduled during May 10th - 13th, 2022'
    }
  }
});

module.exports = mongoose.model('Interview', interviewSchema);
