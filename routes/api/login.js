const express = require("express");
const router = express.Router();

router.post("/", require("../../controller/loginController"));

module.exports = router;