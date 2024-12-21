const Ticket=require("../models/ticket")
const Stade=require("../models/stade");
const User=require("../models/user");
exports.submitTicket=async (req,res)=>{

    const {name,_id,
    price,
    solde_out,
    saller,
    stade,
    is_cheapest,
    certified_saller,
    instant_confirmation,
    qty}=req.body;
    if(_id==""){
        var t=await Ticket.find({name,stade}).select()
        if(t.length!=0)
           return res.status(400).json({err:"Please the name is already exist !!"})
       const u=await User.find({_id:saller}).select("-photo")
       const s=await Stade.find({_id:stade}).select("-photo")
       const ticket=await Ticket.create({
           name,
           price,
           solde_out,
           saller:u[0],
           stade:s[0],
           is_cheapest,
           certified_saller,
           instant_confirmation,
           qty
       })
       if(ticket)
           return res.json({message:"Created with success !!"})
       return res.status(400).json({err:ticket})
       
    }else{
        var t=await Ticket.find().select().and([{_id:{$ne:_id}},{name},{stade}])
        if(t.length!=0)
           return res.status(400).json({err:"Please the name is already exist !!"})
       const u=await User.find({_id:saller}).select("-photo")
       const s=await Stade.find({_id:stade}).select("-photo")
       const ticket=await Ticket.findOneAndUpdate({_id},{$set:{
        name,
        price,
        solde_out,
        saller:u[0],
        stade:s[0],
        is_cheapest,
        certified_saller,
        instant_confirmation,
        qty
       }
 
       },{new:true})
       if(ticket)
           return res.json({message:"Updated with success !!"})
       return res.status(400).json({err:ticket})
            
    }

}
exports.deleteTciket=async (req,res)=>{
    const {_id}=req.body;
    const t=await Ticket.findOneAndDelete({_id})
    if(t)
        return res.json({message:"Deleted with Success "})
        return res.status(400).json({err:t})
}

exports.getData=async (req,res)=>{
    
}