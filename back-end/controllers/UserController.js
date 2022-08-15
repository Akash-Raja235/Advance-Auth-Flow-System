
import User from '../models/User.js'
import crypto from 'crypto'
import {StatusCodes} from 'http-status-codes'
import sendEmail from '../utils/sendEmail.js'
// import newToken  from '../models/token.js'
import bcrypt from "bcryptjs";
import  Jwt  from 'jsonwebtoken';
import sendVerificationEmail from '../utils/sendVerificationEmail.js'
import ForgotPasswordEmail from '../utils/ForgotPasswordEmail.js';


 const signup = async(req,res,next)=>{

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json("all field are required");
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res
        .status(400)
        .json({ msg: "user is already exist try to login !" });
    }
     
      const verificationToken = crypto.randomBytes(40).toString("hex");
      
    const user = await  User.create({
      name,
      email,
      password,
      verificationToken,
    });
      
     
    
    const origin = "http://localhost:3000";

    // send verification Email
     await sendVerificationEmail({
       name: user.name,
       email: user.email,
       verificationToken: user.verificationToken,
       origin: origin,
     });
    // const token= user.createJWT()
   
    return res.status(201).json({
      msg: " email has been sent to check to verify",
     verificationToken
    });

       
 }

 const verifyEmail = async (req,res)=>{
  const { verificationToken, email } = req.body;
 
  let user = await User.findOne({email})

  if(!user){
    return res.status(500).json({message:"   user not found "})
  }
  if (user.verificationToken !== verificationToken) {
   return res.status(500).json({ message: "failed" });
  }
   
  await User.findByIdAndUpdate(user._id, {
    $set: {
      isVerified: true,
      verifield: Date.now(),
      verificationToken: "",
    },
  });
  // user.isVerified = true;
  // user.verifield = Date.now();
  // user.verificationToken = "";
  // await user.save()
  return res.status(200).json({message:'success'})
 }



 const signin = async(req,res)=>{
    
     const {email, password} = req.body;

     if (!email || !password) {
       return res.json({message:'plese provide email and pass'});
     }
   

     const user = await User.findOne({email})
      
     if(!user){
      return res.status(400).json({message:"user not found"})
     
     } 

    
    const isPassword = await user.comparePassword(password);
       
      if (!isPassword) {
        return res.status(400).json({ message: "password not match" });
      }
      
      if (!user.isVerified) {
        return res.json({message:"Please verify your email"});
      }
       const accessToken = user.createJWT()
       
       const longTime = 1000*60*60*24*30
        res.cookie("token", accessToken, {
         httpOnly: true,
        //  signed: true,
         sameSite:'lax',
         expires: new Date(Date.now() + longTime),
       });
       
       return res
         .status(200)
         .json({
           message: "success",
           name: user.name,
           email: user.email,
           accessToken,  
         });


 }


  const ForgotPassword = async (req,res) => {
    
    const {email} = req.body;
    
    try {
    if(!email){
      return res.status(400).json({message:"All field are required"})
    }
    const user = await User.findOne({email})  
    if(!user){
     return res.status(400).json({ message: "User not Found" });
    }
    
    if(!user.isVerified){
      return res.status(400).json({ message: "you are not valid user" });
    }

      const token = await Jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'15m'})

       await ForgotPasswordEmail({
         name: user.name,
         id: user._id,
         token: token,
         email: user.email,
       });

       return res.status(200).json({message:"link has been sent to this email"})

    } catch (error) {
      return res.status(500).json({message:"Internal Server Error"})
    }
  };

  const ForgotPasswordChange = async (req,res)=>{
    
     const{password,Confirm_password} = req.body
     const{id,token} = req.params

    
      try {
          const user = await User.findById(id)
          const new_Token = process.env.JWT_SECRET
          const verifyToken = Jwt.verify(token,new_Token)
          if(!verifyToken){
             return res.status(400).json({ message: "Token is expired" });
          }
         
          if(!password || !Confirm_password ){
           return res.status(400).json({ message: "All field are required" });
          }
          if(password !== Confirm_password){
             return res.status(400).json({ message: "Password & confirm password not match" });
          }
           
            
           const salt = await bcrypt.genSalt(10);
           const hashPassword = await bcrypt.hash(password, salt);
           await User.findByIdAndUpdate(user._id, {
             $set: { password: hashPassword },
           })  
           
         return res
           .status(200)
           .json({ message: "password has updated"});
          
     } catch (error) {
      return res.send(error.message)
     
     }

  }

  const changePassword = async(req,res,next)=>{

    const {password,Confirm_password} = req.body

    if (!password || !Confirm_password){
      return res.status(400).json({message:"All fields are required"})
    }
    if(password !== Confirm_password){
      return res.status(400).json({ message: "Password does not match" });
    }
      try {
        const salt= await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)
        await User.findByIdAndUpdate(req.user._id,{$set:{password:hashPassword}})
        return res.status(200).json({message:"Password Changed Successfully"})
      } catch (error) {
        return res.send(error.message)
      }
    
  }
 

  const loggedUser =(req,res)=>{
    return res.status(200).json({"user":req.user})   
  }
 export {
   signup,
   signin,
   verifyEmail,
   ForgotPassword,
   ForgotPasswordChange,
   changePassword,
   loggedUser,
 };
  