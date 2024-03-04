const Interviews = require("../models/Interview");
const Company = require("../models/Company");

exports.getInterviews = async (req, res, next) => {
  let query;
  console.log("reqested by", req.user.role);
  if (req.user.role !== "admin") {
    // return own interviews if not admin
    query = Interviews.find({ user: req.user.id }).populate({
      path: "user",
      select: "name telephoneNumber email",
    });
  } else {
    if (req.body.user) {
      // return all interviews of a specific user if admin
      query = Interviews.find({ user: req.body.user }).populate({
        path: "user",
        select: "name telephoneNumber email",
      });
    } else {
      // return all interviews of all users if no user is specified
      query = Interviews.find().populate({
        path: "user",
        select: "name telephoneNumber email",
      });
    }
  }
  try {
    const interviewed = await query;

    res.status(200).json({
      success: true,
      count: interviewed.length,
      data: interviewed,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Cannot find Interview",
    });
  }
};

exports.getInterview = async (req, res, next) => {
  try {
    const interviews = await Interviews.findById(req.params.id).populate({
      path: "user",
      select: "name telephoneNumber email",
    });

    if (!interviews) {
      return res.status(404).json({
        success: false,
        message: `No Interview with the id of ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: interviews,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Cannot find Interview",
    });
  }
};

exports.bookInterview = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    console.log(req.params.companyId);
    const existedInterviews = await Interviews.find({ user: req.user.id });

    if (existedInterviews.length >= 3 && req.user.role != "admin") {
      return res.status(400).json({
        success: false,
        message: `The user with ID ${req.user.id} has already book 3 Interviews`,
      });
    }

    console.log(req.body);
    const new_interview = await Interviews.create(req.body);
    res.status(200).json({
      success: true,
      data: new_interview,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Cannot book Interview",
    });
  }
};

exports.editInterview = async (req, res, next) => {
  try {
    const interview = await Interviews.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({
        success: false,
        message: `No Interview with the id of ${req.params.id}`,
      });
    }

    // ensure owner if not admin
    if (req.user.role !== "admin" && interview.user.toString() !== req.user.id) {
        return res.status(401).json({
          success: false,
          message: `User ${req.user.id} is not authorized to update Interview ${req.params.id}`,
        });
    }

    const updatedInterview = await Interviews.findByIdAndUpdate(
      req.params.id,
      {
        company: req.body.company,
        date: req.body.date,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: updatedInterview,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Cannot edit Interview, Either the Interview does not exist or the parameters are not correct",
    });
  }
};

exports.deleteInterview = async (req, res, next) => {
  try {
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
