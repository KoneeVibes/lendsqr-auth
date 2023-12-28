const express = require("express");
const router = express.Router();
const { addUser, deleteUser } = require('../../controller/manageUser')

router.get("/", require("../../controller/dashboardController"));

router
    .post("/adduser", addUser)
    .delete("/removeuser", deleteUser)

module.exports = router;