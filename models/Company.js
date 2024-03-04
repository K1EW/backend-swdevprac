const mongoose = require('mongoose');

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
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// Cascade delete appointments when a hospital is deleted
companySchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    console.log(`Interviews being remove from company ${this._id}`);
    await this.model('Interview').deleteMany({ company: this._id });
    next();
});

// Reverse populate with virtuals
companySchema.virtual("interviews", {
    ref: "Interview",
    localField: "_id",
    foreignField: "company",
    justOne: false,
});

module.exports = mongoose.model('Company', companySchema);
