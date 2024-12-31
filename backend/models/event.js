const mongoose=require("mongoose");
const eventSchema=mongoose.Schema({
    photo:{data:Buffer,contentType:String},
    name:{type:String,required:true},
    city:{type:String,required:true},
    contry:{type:String,required:true},
    date:{type:String,required:true},
    status:{type:String,required:true},
    
    
},{timestamps:true})
module.exports=mongoose.model("Event",eventSchema);