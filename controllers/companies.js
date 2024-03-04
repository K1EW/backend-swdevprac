const Company = require("../models/Company");

exports.getCompanies = async (req, res, next) => {
    try {
        const companies = await Company.find();
        res.status(200).json({ success: true, count: companies.length, data: companies });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};

exports.createCompany = async (req, res, next) => {
    const company = await Company.create(req.body);
    res.status(201).json({
        success: true,
        data: company
    });
};
