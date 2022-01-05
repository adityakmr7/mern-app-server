const jwt = require('jsonwebtoken');
const UserServices = require('../services/UserServices');
exports.isAuthenticate = ( req,res,next) => {
    const header = req.headers.authorization;
    let token;
  
    if(header) token = header.split(" ")[1];
    if(token) {
        jwt.verify(token,process.env.SECRET_KEY, async(err, decoded) => {
            if(err) {
                res.status(401).json({error:{message: 'Invalid token'}})
            }else {
                const user = await UserServices.findByUserId(decoded.data);
                req.currentUser = user;
                next();
            }
        })
    }else {
        res.status(401).json({
            error: {message:"No token provided"}
        })
    }
}