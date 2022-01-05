const User = require("../models/user.model");
const bcrypt = require('bcrypt');
class UserServices {
    static async findByEmail(email) {
        return User.findOne({email}).exec();
    }
    static async createUser(username, email, password) {
        const user = new User();
        const hashedPassword = bcrypt.hashSync(password, 10);
        user.email = email;
        user.username = username;
        user.password = hashedPassword;
        const saveUser = await user.save();
        return saveUser;
    }
    static async findByUsername(username) {
        return User.findOne({username}).exec();
    }
    static async findByUserId (id) {
        const user = await User.findById(id);
        return user;
    }
}

module.exports = UserServices;