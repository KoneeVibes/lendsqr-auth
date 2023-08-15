const dbConnect = require('./db/dbConnect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const User = require('./db/userModel');
const bodyParser = require('body-parser');
const auth = require('./auth');

dbConnect();

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

app.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then((hashedPassword) => {
            const user = new User({
                email: req.body.email,
                password: hashedPassword,
            });
            user
                .save()
                .then((result) => {
                    res.status(200).send({
                        message: "Successfully created user",
                        result,
                    })
                })
                .catch((err) => {
                    res.status(500).send({
                        message: "Error occured while creating user",
                        err,
                    })
                })
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Your password was not successfully hashed',
                err
            })
        })
})

app.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then((user) => {
            bcrypt.compare(req.body.password, user.password) //Throws an error only if req.body.password and user.password are not of the same data type. Else, it returns true of false depending on similarity of values that's why we do a follow up conditional check to test values.
                .then((passwordCheck) => {
                    if (!passwordCheck) {
                        return res.status(400).send({
                            message: "Passwords don't match",
                        })
                    }
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            userEmail: user.email,
                        },
                        "RANDOM-TOKEN",
                        { expiresIn: "24h" }
                    )
                    return res.status(200).send({
                        message: "Login Successful",
                        email: user.email,
                        token,
                    })
                })
                .catch((err) => {
                    res.status(400).send({
                        message: "Password entered is not in the database",
                        err
                    })
                })
        })
        .catch((err) => {
            res.status(400).send({
                message: "Your email was not found in the database",
                err
            })
        })
})

app.get("/home", (req, res) => {
    res.json({
        message: "you have a free access to this endpoint"
    })
})

app.get("/dashboard", auth, (req, res) => {
    res.json({
        message: "You are authenticated to access this endpoint"
    })
})

module.exports = app;