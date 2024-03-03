const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    from: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                const startDate = new Date('2022-05-10');
                const endDate = new Date('2022-05-13');
                return value >= startDate && value <= endDate;
            },
            message: 'Interviews can only be scheduled during May 10th - 13th, 2022'
        }
    },
    to: {
        type: Date,
        required: true
    }
});

// Validate that a user can book up to 3 interview sessions
interviewSchema.path('user').validate(async function(value) {
    const count = await this.model('Interview').countDocuments({ user: value });
    return count < 3;
}, 'A user can book up to 3 interview sessions');

module.exports = mongoose.model('Interview',interviewSchema);