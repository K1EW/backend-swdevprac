const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  getCompanies,
  createCompany,
  getCompany,
  updateCompany,
  deleteCompany
} = require('../controllers/companies');

const router = express.Router();

router
  .route('/')
  .get(getCompanies)
  .post(protect, authorize('admin', "company"), createCompany);
router
  .route('/:id')
  .get(protect,getCompany)
  .put(protect, authorize('admin', "company"), updateCompany)
  .delete(protect, authorize('admin', "company"), deleteCompany);

module.exports = router;
