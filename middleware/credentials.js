const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.headers("Access-Control-Allow-Credentials", true);
        // realized later that I had res.headers() instead of res.header(),
        // so calling next() broke the app. should implement logic to catch error from this block.
        // or write typescript. lol.
    } else {
        console.log("request from an unauthorized origin")
        res.status(401).json({
            message: "request from an unauthorized origin"
        })
    }
    next();
}

module.exports = credentials;