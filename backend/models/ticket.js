const mongoose=require("mongoose");
const {ObjectId}=require("mongoose").Schema
const placeSchema=mongoose.Schema({
    name:{type:String,required:true},
    price:{type:String,required:true},
    solde_out:{type:String,required:true},
    saller:{type:ObjectId,ref:"User",required:true},
    stade:{type:ObjectId,ref:"Stade",required:true},
    is_cheapest:{type:String,required:true},
    certified_saller:{type:String,required:true},
    instant_confirmation:{type:String,required:true},
    qty:{type:String,required:true}
})
module.exports=mongoose.model("Ticket",placeSchema);

