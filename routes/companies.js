const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const { getCompanies, createCompany } = require("../controllers/companies");

const router = express.Router();

router.route("/").get(getCompanies).post(createCompany);

module.exports = router;
