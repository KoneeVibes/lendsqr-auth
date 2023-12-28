const mongoose = require('mongoose');

// important to highlight here that, this schema will be created on the database you had connected to in dbConnect.js 
const userSchema = new mongoose.Schema({
    personalInfo: {
        email: {
            type: String,
            required: [true, "Please provide an Email!"],
            unique: [true, "Email Exist"],
        },
        password: {
            type: String,
            required: [true, "Please provide a password!"],
            unique: false,
        },
        username: String,
        phoneNumber: Number,
        firstName: String,
        lastName: String,
        bvn: Number,
        maritalStatus: String,
        children: String,
        residenceType: String
    },

    educationAndEmployment: {
        educationLevel: String,
        employmentStatus: String,
        employmentSector: String,
        employmentDuration: String,
        workEmail: String,
        monthlyIncome: String
    },

    socials: {
        twitter: String,
        facebook: String,
        instagram: String
    },
    
    guarantorDetails: {
        name: String,
        email: String,
        phoneNumber: Number,
        relationship: String
    }
})

module.exports = mongoose.model('Users', userSchema);