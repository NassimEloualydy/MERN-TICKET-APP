const jwt=require("jsonwebtoken");
require("dotenv").config();
exports.auth=async (req,res,next)=>{
if(!req.headers.authorization){
    return res.status(400).json({err:"Unothorized user !!"})
}
const token=req.headers.authorization.split(' ')[1];
const {user}=jwt.verify(token,process.env.JWT_SECRETE);

req.user=user
next();
}