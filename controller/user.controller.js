const validation = require("../middleware/validator");
const UserServices = require("../services/UserServices");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const validationErrors = validation.validationResult(req);
    const errors = [];
    if (!validationErrors.isEmpty) {
      validationErrors.errors.forEach((error) => {
        errors.push(error.param);
      });
    } else {
      const existingEmail = await UserServices.findByEmail(email);
      const existingUsername = await UserServices.findByUsername(username);

      if (existingEmail || existingUsername) {
        errors.push({ message: "Email or username already exist." });
      }
    }
    if (errors.length) {
      return res.status(400).json({
        error: errors,
      });
    }
    const userSaved = await UserServices.createUser(username, email, password);
    res.status(201).json({
      message: "User created!",
      user: {
        username: userSaved.username,
        email: userSaved.email,
      },
    });
  } catch (error) {
    return next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const validationErrors = validation.validationResult(req);
    const errors = [];
    if (!validationErrors.isEmpty) {
      validationErrors.errors.forEach((error) => {
        errors.push(error.param);
      });
    }

    const existingUser = await UserServices.findByUsername(username);

    if (!existingUser) {
      error.push({
        message: "User doesn't exist!",
      });
    }
    const isPassword = await bcrypt.compare(password, existingUser.password);
    if (!isPassword) {
      errors.push({
        message: "Incorrect username or password!",
      });
    }
    const token = jwt.sign(
      {
        data: existingUser._id,
      },
      process.env.SECRET_KEY
    );
    res.status(200).json({
        data: {
            access_token: token
        }
    })
  } catch (error) {}
};
