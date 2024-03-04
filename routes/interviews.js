const express = require('express');
const {
  bookInterview,
  deleteInterview,
  editInterview,
  getInterviews,
  getInterview
} = require('../controllers/interviews');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, getInterviews)
  .post(protect, authorize('admin', 'user'), bookInterview);
router
  .route('/:id')
  .get(protect, getInterview)
  .put(protect, authorize('admin', 'user'), editInterview)
  .delete(protect, authorize('admin', 'user'), deleteInterview);

module.exports = router;
