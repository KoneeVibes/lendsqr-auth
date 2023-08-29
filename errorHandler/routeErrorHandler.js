const path = require("path");

const routeErrorHandler = (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "..", "view", "index.html"))
}

module.exports = routeErrorHandler;