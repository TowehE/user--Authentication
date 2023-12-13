const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: [true, "First name is required"]
    }, 
    lastName: {
        type: String, 
        required: [true, "Last name is required"]
    }, 
    username: {
        type: String, 
        required: [true, "username is required"], 
        unique: true,
    }, 
    phoneNumber: {
        type: String, 
        required: [true, "Phone number is required"],
    },
    email: {
        type: String, 
        required: [true, "email is required"],
        unique: true,
    }, 
    password: {
        type: String, 
        required: [true, "password is required"]
    }, 
    confirmPassword: {
        type: String, 
        required: [true, "password is required"]
    }, 

}, {timestamps: true});

const userModel = mongoose.model('userData', userSchema);


module.exports = userModel;