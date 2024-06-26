const Company = require("../models/Company");

exports.getCompanies = async (req, res, next) => {
    try {
        let query;
        const reqQuery = { ...req.query };
        const removeFields = ["select", "sort", "page", "limit"];
        removeFields.forEach((param) => delete reqQuery[param]);
        console.log(reqQuery);
        let queryStr = JSON.stringify(req.query);
        queryStr = queryStr.replace(
            /\b(gt|gte|lt|lte|in)\b/g,
            (match) => `$${match}`
        );
        query = Company.find(JSON.parse(queryStr))

        if (req.query.select) {
            const fields = req.query.select.split(",").join(" ");
            query = query.select(fields);
        }
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        }
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 25;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Company.countDocuments();
        query = query.skip(startIndex).limit(limit);
        const companies = await query;
        const pagination = {};

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit,
            };
        }
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit,
            };
        }
        res
            .status(200)
            .json({
                success: true,
                count: companies.length,
                pagination,
                data: companies,
            });
    } catch (err) {
        res.status(400).json({ success: false });
    }

};

exports.getCompany = async (req, res, next) => {
    try {
        query = Company.findById(req.params.id).populate("interviews");
        const company = await query;
        if (!company) {
            return res.status(400).json({ success: false, error: "Company not found"});
        }
        res.status(200).json({ success: true, data: company });
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
};

exports.createCompany = async (req, res, next) => {
    try {
        const company = await Company.create(req.body);
        res.status(201).json({
            success: true,
            data: company
        });
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
};

exports.updateCompany = async (req, res, next) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!company) {
            return res.status(400).json({ success: false })
        }

        res.status(200).json({ success: true, data: company });
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
};

exports.deleteCompany = async (req, res, next) => {
    try {
        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({ success: false })
        }
        await Company.deleteOne();
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
};
