const dbConnect = require('./model/dbConnect');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const corsOptions = require("./config/corsOptions");
const auth = require('./middleware/auth');

// connect to database
dbConnect();

// middleware for all routes
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// endpoints and route handlers
app.use('/register', require("./routes/api/register"));
app.use('/login', require("./routes/api/login"));
app.use("/home", require("./routes/root"));
app.use("/dashboard", auth, require("./routes/api/dashboard"));

// error handler for routes that are not available:
app.use("*", require("./errorHandler/routeErrorHandler"));

// To catch errors that occur while running route handlers and middleware functions if the handlers and middleware functions don't already handle errors internally
app.use(require("./errorHandler/middlewareErrorHandler"));

module.exports = app;