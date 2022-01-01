const validation = require('../middleware/validator');
const UserServices = require('../services/UserServices');

exports.registerUser = async(req,res,next) => {
    const {username,email,password} = req.body;
    try {
        const validationErrors = validation.validationResult(req);
        const errors = [];
        if(!validationErrors.isEmpty) {
            validationErrors.errors.forEach((error) => {
                errors.push(error.param);
            })
        }else {
            const existingEmail = await  UserServices.findByEmail(email);
            const existingUsername =await  UserServices.findByUsername(username);

            if(existingEmail || existingUsername) {
                errors.push({message: 'Email or username already exist.'});      
            }
        }
        if(errors.length) {
            return res.status(400).json({
                error: errors
            })
        }
        const userSaved = await UserServices.createUser(username,email,password);
        res.status(201).json({
            message: "User created!",
            user: {
                username: userSaved.username,
                email: userSaved.email
            }
        })
    } catch (error) {
        return next(error);
    }
}