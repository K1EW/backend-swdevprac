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
  .get(getInterviews)
  .post(bookInterview);
router
  .route('/:id')
  .get(getInterview)
  .put(editInterview)
  .delete(deleteInterview);

module.exports = router;
