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
            //adding the match schemaType to further validate user password
            // match: RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")
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
        type: Map,
        of: String,
    },

    guarantorDetails: {
        name: String,
        email: String,
        phoneNumber: Number,
        relationship: String
    }
})

module.exports = mongoose.model('Users', userSchema);