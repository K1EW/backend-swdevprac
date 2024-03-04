const Interviews = require("../models/Interview");
const Company = require("../models/Company");

exports.getInterviews = async (req, res, next) => {
    let query;
    if (req.user.role !== 'admin') {
      query = Interviews.find({ user: req.user.id }).populate({
        path: 'user',
        select: 'name telephoneNumber email'
      });
    } else {
      if (req.params.userId) {
        console.log(req.params.userId);
        query = Interviews.find({ user: req.params.userId }).populate({
          path: 'user',
          select: 'name telephoneNumber email'
        });
      } else {
        query = Interviews.find().populate({
          path: 'user',
          select: 'name telephoneNumber email'
        });
      }
    }
    try {
      const interviewed = await query;
  
      res.status(200).json({
        success: true,
        count: interviewed.length,
        data: interviewed
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: 'Cannot find Interview'
      });
    }
}

exports.getInterview = async (req, res, next) => {
    try {
      const interviews = await Interviews.findById(req.params.id).populate({
        path: 'user',
        select: 'name telephoneNumber email'
      });
  
      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: `No Interview with the id of ${req.params.id}`
        });
      }
  
      res.status(200).json({
        success: true,
        data: interviews
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: 'Cannot find Interview'
      });
    }
  };

exports.bookInterview = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    console.log(req.params.companyId);
    const existedInterviews = await Interviews.find({ user: req.user.id });

    if (existedInterviews.length >= 3 && req.user.role != 'admin') {
      return res.status(400).json({
        success: false,
        message: `The user with ID ${req.user.id} has already book 3 Interviews`
      });
    }

    console.log(req.body);
    const new_interview = await Interviews.create(req.body);
    res.status(200).json({
      success: true,
      data: new_interview
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Cannot book Interview'
    });
  }
}

exports.editInterview = async (req, res, next) => {
    try {

    } catch (error) {
        res.status(400).json({ success: false });
    }
}

exports.deleteInterview = async (req, res, next) => {
    try {

    } catch (error) {
        res.status(400).json({ success: false });
    }
}