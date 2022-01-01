const User = require("../models/user.model");

class UserServices {
    static async findByEmail(email) {
        return User.findOne({email}).exec();
    }
    static async createUser(username, email, password) {
        const user = new User();
        user.email = email;
        user.username = username;
        user.password = password;
        const saveUser = await user.save();
        return saveUser;
    }
    static async findByUsername(username) {
        return User.findOne({username}).exec();
    }
}

module.exports = UserServices;