const express = require("express");
const router = express.Router();

router.get("", require("../../controller/dashboardController"));

module.exports = router;