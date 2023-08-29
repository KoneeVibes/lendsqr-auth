const getHome = (req, res) => {
    res.json({
        message: "you have a free access to this endpoint"
    })
}

module.exports = getHome;