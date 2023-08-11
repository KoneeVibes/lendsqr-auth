const mongoose = require('mongoose');

// important to highlight here that, this schema will be created on the database you had connected to in dbConnect.js 
const userSchema = new mongoose.Schema({
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
})

module.exports = mongoose.model.Users || mongoose.model('Users', userSchema);