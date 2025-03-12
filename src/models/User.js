

const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please add name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please add email"],
    trim: true,
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password:{
    type:String,
    required:[true,"please add your password"],
    trim:true,
    minlength:6,
    select:false
  },
  role:{
    type:String,
    enum:['admin','user'],
    default:'user'
  }
},
{
    timestamps:true,
}
);

userSchema.pre('save',async(next)=> {
    if(!this.isModified('password')){
        console.log(this.password); 
        next()
    }

     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password,salt)

})

userSchema.methods.matchPassword = async function (enteredPassword){
   return await bcrypt.compare(enteredPassword,this.password)
}

const User = mongoose.model('User',userSchema)

module.exports = User