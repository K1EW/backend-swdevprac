const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Schema
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
        // required for company role with error message
        required: [function() {
            return this.role === 'company';
        }, 'Please add a company you work for in order to register as a company user'],
        type: mongoose.Schema.ObjectId,
        ref: 'Company'
    },
});

module.exports = mongoose.model('User', userSchema);
