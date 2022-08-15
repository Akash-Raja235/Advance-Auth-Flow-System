import mongoose  from "mongoose";

const tokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  userAgent: {                     //device
    type: String,
    required: true,
  },
  isValid:{
    type:Boolean,
    default:true,
  },
  user:{
    type:mongoose.Types.ObjectId,
    ref:'user',
    required:true
  }
},{timestamps:true});

const Token = mongoose.model('Token',tokenSchema)
export default Token