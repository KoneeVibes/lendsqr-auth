const User = require('../model/userModel');
const bcrypt = require('bcrypt');

const getUser = async (req, res) => {
    let query = {};
    if (req.params._id) {
        query._id = req.params._id;
    }
    try {
        const user = await User.find(query);
        res.status(200).json({
            message: "successful",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

const addUser = async (req, res) => {
    const { personalInfo, educationAndEmployment, socials, guarantor } = req.body;

    bcrypt.hash(personalInfo.password, 10, (err, hash) => {
        if (err) {
            return res.json({
                err: err
            })
        }
        const newUser = new User({
            personalInfo: {
                username: personalInfo?.username,
                password: hash,
                email: personalInfo?.useremail,
                phoneNumber: personalInfo?.userPhoneNumber,
                firstName: personalInfo?.firstName,
                lastName: personalInfo?.lastName,
                bvn: personalInfo?.BVN,
                maritalStatus: personalInfo?.maritalStatus,
                children: personalInfo?.children,
                residenceType: personalInfo?.residenceType
            },
            educationAndEmployment: {
                educationLevel: educationAndEmployment?.educationLevel,
                employmentStatus: educationAndEmployment?.employmentStatus,
                employmentSector: educationAndEmployment?.employmentSector,
                employmentDuration: educationAndEmployment?.employmentDuration,
                workEmail: educationAndEmployment?.workEmail,
                monthlyIncome: educationAndEmployment?.monthlyIncome
            },
            socials: {
                twitter: socials?.twitter,
                facebook: socials?.facebook,
                instagram: socials?.instagram
            },
            guarantorDetails: {
                name: guarantor?.fullname,
                email: guarantor?.email,
                phoneNumber: guarantor?.phoneNumber,
                relationship: guarantor?.relationship
            }
        });
        newUser
            .save()
            .then((userDetails) => res.status(201).json({
                message: 'Successful',
                userDetails: userDetails
            }))
            .catch((err) => {
                res.status(500).send({
                    message: "Error occured while creating user",
                    err,
                })
            })
    })
}

const deleteUser = (req, res) => {
    res.json({
        message: 'user has been deleted'
    })
}

module.exports = {
    getUser: getUser,
    addUser: addUser,
    deleteUser: deleteUser
}