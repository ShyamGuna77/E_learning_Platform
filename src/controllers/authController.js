

const User = require('../models/User')

const generateToken = require('../config/jwt')

const catchAsync = require('../utils/catchAsync')

const {AppError} = require('../middleware/errorHandler')

 
// @desc    Register user
// @route   POST /api/auth/register
// @access  Public

const register = catchAsync(async(req,res,next)=>{
    const {username,email,password,role} = req.body

    const userExists = await User.findOne({email});
    if(userExists){
        return next(new AppError("User Already exists",400))
    }

    const user = await User.create({
        username,
        email,
        password,
        role:role || 'user'
    })

    if(user){
        res.status(201).json({
            success:true,
            user:{
                _id:user._id,
                username:user.username,
                email:user.email,
                role:user.role,
            },
            token:generateToken(user._id)
        })
    }else{
        return next(new AppError("Invalid user Details",400))
    }

})

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public


const login = catchAsync(async (req,res,next)=> {
    const{email,password} = req.body;

  const user = await User.findOne({email}).select('+password')

  if(!user){
    return next(new AppError("Invalid data User doesnt exist",401))
  }

  const isMatch = await user.matchPassword(password)

  if(!isMatch){
    return next(new AppError("Password doesnt match error ",401))
  }
  res.status(200).json({
    success:true,
    user:{
        _id:user._id,
        username:user.username,
        email:user.email,
        role:user.role
    },
    token:generateToken(user._id)
  })

})

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

module.exports = {register,login,getMe};