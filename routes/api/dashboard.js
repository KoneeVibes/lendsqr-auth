const express = require("express");
const router = express.Router();
const { getUser, addUser, deleteUser } = require('../../controller/manageUser')

router.get("/", require("../../controller/dashboardController"));

router.route("/user/:_id?")
    .get(getUser)
    .post(addUser)
    .delete(deleteUser)

module.exports = router;