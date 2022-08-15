
import mongoose from 'mongoose'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, " name must be required"],
  },
  email: {
    type: String,
    required: [true, " email must be required"],
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, " password must be required"],
   
  },
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifield: Date,
});

    UserSchema.pre('save', async function(){
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password,salt)
    
    })

  UserSchema.methods.createJWT = function(){
    return jwt.sign({userId:this._id,name:this.name} ,process.env.JWT_SECRET,{expiresIn:'30d'})
  }


  UserSchema.methods.comparePassword = async function(condidatePassword){
    let isMatch = await bcrypt.compare(condidatePassword, this.password);
    return isMatch
  }

const User = mongoose.model('User',UserSchema)
export default User;