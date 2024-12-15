const mongoose=require("mongoose");
const bcryptjs=require("bcryptjs");
const userSchema=mongoose.Schema({

    photo:{data:Buffer,contentType:String},
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    phone:{type:String,required:true},
    email:{type:String,required:true},
    pw:{type:String,required:true},
    role:{type:String,required:true}
},{timestamps:true})

userSchema.methods.matchPassword= async (entered_password,password)=>{
    console.log("the paswords !!")
    console.log(entered_password)
    console.log(password)
    const res=await bcryptjs.compare(entered_password,password)
    console.log(res)
    return res

}
module.exports=mongoose.model('User',userSchema)