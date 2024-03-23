const express = require('express');
const {
  bookInterview,
  deleteInterview,
  editInterview,
  getInterviews,
  getInterview
} = require('../controllers/interviews');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(protect, getInterviews)
  .post(protect, bookInterview);
router
  .route('/:id')
  .get(protect, getInterview)
  .put(protect, editInterview)
  .delete(protect, deleteInterview);

module.exports = router;
