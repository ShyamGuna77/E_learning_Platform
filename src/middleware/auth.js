

const jwt = require('jsonwebtoken')
const User = require('../models/User')
const {AppError} = require('./errorHandler')

const catchAsync = require('../utils/catchAsync')

const protect = catchAsync(async(req,res,next) => {

    let token ;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return next(new AppError("Not authorized token",401))
    }
    try {

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findById(decoded.id).select("-password");

        if(!user){
            return  next(new AppError("User not found ",401))
        }
        req.user = user;
        next()
        
    } catch (error) {
       return  next(new AppError("Not Authorized to access route ",401))
    }

})

const adminOnly = (req,res,next) => {

    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return next(new AppError("Not authorized as an admin", 403));
    }
}

module.exports = {protect,adminOnly}