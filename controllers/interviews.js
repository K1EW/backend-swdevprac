const Interviews = require('../models/Interview');

exports.getInterviews = async (req, res, next) => {
    try {
        const interviews = await Interviews.find();
        res.status(200).json({
            success: true,
            count: interviews.length,
            data: interviews
        });
    } catch (err) {
        res.status(500).json({ success: false, err });
    }
};

exports.getInterview = async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const interviews = await Interviews.find({ user: user_id });
        if (!interviews) {
            return res.status(404).json({
                success: false,
                message: `No Interviews for the user with the id of ${user_id}`
            });
        }
        res.status(200).json({
            success: true,
            count: interviews.length,
            data: interviews
        });
    } catch (err) {
        res.status(500).json({ success: false, err });
    }
};

exports.bookInterview = async (req, res, next) => {
    try {
        const existedInterviews = await Interviews.find({ user: req.body.user });
        const startDate = new Date("2022-05-10T00:00:00.000Z");
        const endDate = new Date("2022-05-13T23:59:59.999Z");
        const bookDate = new Date(req.body.date);

        bookDate.setDate(bookDate.getDate());

        if (existedInterviews.length >= 3) {
            return res.status(400).json({
                success: false,
                message: `The user with ID ${req.body.user} has already book 3 Interviews`
            });
        } else if (bookDate <= startDate || bookDate >= endDate) {
            return res.status(400).json({
                success: false,
                message: "Interviews can only be scheduled during May 10th - 13th, 2022"
            });
        }

        const new_interview = await Interviews.create(req.body);
        res.status(200).json({
            success: true,
            data: new_interview
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Cannot book Interview'
        });
    }
};

exports.editInterview = async (req, res, next) => {
    try {
        const interview = await Interviews.findById(req.params.id);
        if (!interview) {
            return res.status(404).json({
                success: false,
                message: `No Interview with the id of ${req.params.id}`
            });
        }

        const updatedInterview = await Interviews.findByIdAndUpdate(
            req.params.id,
            {
                company: req.body.company,
                date: req.body.date
            },
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            data: updatedInterview
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            err
        });
    }
};

exports.deleteInterview = async (req, res, next) => {
    try {
        const interview = await Interviews.findById(req.params.id);
        if (!interview) {
            return res.status(404).json({
                success: false,
                message: `No Interview with the id of ${req.params.id}`
            });
        }

        await interview.deleteOne();

        res.status(200).json({
            success: true,
            message: `Interview ${req.params.id} deleted`
        });
    } catch (error) {
        console.log(error);
        res
            .status(400)
            .json({ success: false, message: 'Cannot delete Interview' });
    }
};
