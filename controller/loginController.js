const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const loginUser = (req, res) => {
    if (!req.body.email || !req.body.password) return res.sendStatus(400);
    User.findOne({
        'personalInfo.email': req.body.email
    })
        .then((user) => {
            bcrypt.compare(req.body.password, user['personalInfo'].password) //Throws an error only if req.body.password and user.password are not of the same data type. Else, it returns true of false depending on similarity of values that's why we do a follow up conditional check to test values.
                .then((passwordCheck) => {
                    if (!passwordCheck) {
                        return res.status(401).send({
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
                        userInfo: {
                            email: user.personalInfo.email,
                            _id: user._id
                        },
                        token,
                    })
                })
                .catch((err) => {
                    res.status(401).send({
                        message: "Password entered is not in the database",
                        err
                    })
                })
        })
        .catch((err) => {
            res.status(401).send({
                message: "Your email was not found in the database",
                err
            })
        })
}

module.exports = loginUser;