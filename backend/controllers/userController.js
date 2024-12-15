const user=require("../models/user");
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
require("dotenv").config();
exports.sigInUser=async (req,res)=>{
    console.log(req.body)
    const {first_name,last_name,email,pw,role,phone}=req.body;
    var u=await user.find({first_name,last_name}).select("-photo")
    if(u.length!=0)
        return res.status(400).json({err:"Please the first name and the last name is already exist !! "})
    u=await user.find({email}).select("-photo")
    if(u.length!=0)
        return res.status(400).json({err:"Please the email is already exist !!"});
    u=await user.find({phone}).select("-photo")
    if(u.length!=0)
        return res.status(400).json({err:"Please the phone is already exist !!"});
    const salt=await bcryptjs.genSalt(10);
    const new_password=await bcryptjs.hash(pw,salt);
    u=await user.create({
        first_name,last_name,email,pw,role:'admin',phone,pw:new_password
    })
    if(u)
        return res.json({message:"Sign In With Success !!"})
}
exports.logIn= async (req,res)=>{
    const {email,pw}=req.body
    var u=await user.find({email}).select("-photo")
    if(u.length==0)
        return res.status(400).json({err:"Please this email is not found !!"});
    console.log("from controller")
    var resp=await u[0].matchPassword(pw,u[0].pw)
    
    if(!resp)
        return res.status(400).json({err:"Please the password does not match !!"})
    const token=jwt.sign({user:u[0]._id},process.env.JWT_SECRETE,{expiresIn:'30d'})
    return res.json({message:"Login With Success",token})
}   

exports.updateAccount=async (req,res)=>{
    const {first_name,last_name,email,pw,role,phone}=req.body;
    console.log(req.user)
    const salt=await bcryptjs.genSalt(10)
    const new_pw=await bcryptjs.hash(pw,salt);
    var u=await user.find().select("-photo").and([{_id:{$ne:req.user}},{first_name},{last_name}])
    if(u.length!=0)
        return res.status(400).json({err:"Please the first name and the last name is laready exist !!"})
    u=await user.find().select("-photo").and([{_id:{$ne:req.user}},{email}])
    if(u.length!=0)
        return res.status(400).json({err:"Please the email  is laready exist !!"})
    u=await user.find().select("-photo").and([{_id:{$ne:req.user}},{phone}])
    if(u.length!=0)
        return res.status(400).json({err:"Please the phone  is laready exist !!"})
    const User=await user.findOneAndUpdate(
        {_id:req.user},
        {$set:{
            first_name,last_name,email,pw:new_pw,role,phone
        }},{$new:true}
    )
    if(User)
        return res.json({message:"User Updated with success "})
    return res.status(400).json({err:User})
}
