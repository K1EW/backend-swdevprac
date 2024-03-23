const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Schema
const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    telephoneNumber: {
        type: String,
        required: [true, 'Please add a telephone number'],
        match: [/^\d{10}$/, 'Please add a valid 10-digit telephone number']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'company'],
        default: 'user'
    },
    company: {
        type: mongoose.Schema.ObjectId,
        ref: 'Company',
        unique: true,
        sparse: true // Allows multiple null values for company, but ensures uniqueness among non-null values
    },
});

// Middleware to enforce unique constraint if role is "company"
userSchema.pre('save', async function(next) {
    if (this.role === 'company' && this.isNew) {
        const existingUser = await mongoose.model('User').findOne({ company: this.company });
        if (existingUser) {
            const error = new Error('Company must be unique among users with role "company"');
            next(error);
        }
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
