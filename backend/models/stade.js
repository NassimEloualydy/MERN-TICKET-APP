const mongoose=require("mongoose");
const stadSchema=mongoose.Schema({
    photo:{data:Buffer,contentType:String},
    name:{type:String,required:true},
    city:{type:String,required:true},
    nbr_places:{type:String,required:true},
    adresse:{type:String,required:true},
    status:{type:String,required:true},
},{timestamps:true})
module.exports=mongoose.model("Stade",stadSchema);
