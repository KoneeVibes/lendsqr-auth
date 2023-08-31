const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Credentials", true);
        // realized later that I had res.headers() instead of res.header(),
        // so calling next() broke the app. should implement logic to catch error from this block.
        // or write typescript. lol.
    }
    next();
}

module.exports = credentials;