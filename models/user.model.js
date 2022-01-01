const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        trim:true,
        minlength: 6,
        unique:true,
    },
    email: {
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true

    },
    password: {
        type:String,
        required:true,
        trim:true,
        minlength:8,
    }
},{timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;