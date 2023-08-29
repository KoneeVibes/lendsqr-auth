const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "you have a free access to this endpoint"
    })
})

module.exports = router;