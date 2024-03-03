const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Company Schema
const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a company name"]
    },
    address: {
        type: String,
        required: [true, "Please add a company address"]
    },
    website: {
        type: String,
        match: [
            /(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+)\.([a-zA-Z]{2,})/,
            'Please add a valid website URL'
        ]
    },
    description: {
        type: String,
        required: [true, "Please add a company description"]
    },
    telephoneNumber: {
        type: String,
        required: [true, "Please add a company telephone number"],
        match: [
            /^\d{10}$/,
            'Please add a valid 10-digit telephone number'
        ]
    }
});

module.exports = mongoose.model('Company',companySchemaSchema);