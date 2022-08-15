import  Jwt  from "jsonwebtoken";
import User from "../models/User.js";


const checkAuth = async(req, res, next)=>{

    let token
    const {authorization} = req.headers
   

    if(authorization && authorization.startsWith('Bearer')){
        try {
            token = authorization.split(' ')[1]
            //verify Token 
            const { userId } = Jwt.verify(token, process.env.JWT_SECRET);
            // get user from token
            req.user = await User.findById(userId).select('-password')
            next()
        } catch (error) {
            return res.status(401).json({message:"unAuthorized user"})
        }
    }
   if(!token){
    return res.status(401).json({ message: "unAuthorized user,No Token" });
   }
}

export default checkAuth