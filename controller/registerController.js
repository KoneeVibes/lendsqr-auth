const bcrypt = require("bcrypt");
const User = require("../model/userModel");

const registerNewUser = (req, res) => {
    if (!req.body.password || !req.body.email) return res.sendStatus(400);
    bcrypt.hash(req.body.password, 10)
        .then((hashedPassword) => {
            const user = new User({
                'personalInfo.email': req.body.email,
                'personalInfo.password': hashedPassword,
            });
            user
                .save()
                .then((result) => {
                    res.status(201).send({
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
}

module.exports = registerNewUser;