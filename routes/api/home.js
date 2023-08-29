const express = require("express");
const router = express.Router();

router.get("/", require("../../controller/homeController"));

module.exports = router;