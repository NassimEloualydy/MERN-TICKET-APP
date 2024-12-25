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
   const {name,price,solde_out,first_name,last_name,stade,is_cheapest,certified_saller,instant_confirmation,qty}=req.body 
   const searchQuery={}
   searchQuery.name={$regex:'.*'+name+'.*',$options:'i'}
   searchQuery.price={$regex:'.*'+price+'.*',$options:'i'}
   searchQuery.solde_out={$regex:'.*'+solde_out+'.*',$options:'i'}
   searchQuery.is_cheapest={$regex:'.*'+is_cheapest+'.*',$options:'i'}
   searchQuery.certified_saller={$regex:'.*'+certified_saller+'.*',$options:'i'}
   searchQuery.instant_confirmation={$regex:'.*'+instant_confirmation+'.*',$options:'i'}
   searchQuery.qty={$regex:'.*'+qty+'.*',$options:'i'}
   const data=await Ticket.find(searchQuery).select().populate([
    {
        path:"saller",
        model:"User",
        select:['_id','first_name','last_name'],
        match:{
            first_name:{$regex:'.*'+first_name+'.*',$options:'i'},
            last_name:{$regex:'.*'+last_name+'.*',$options:'i'},
        }
    },
    {
        path:"stade",
        model:"Stade",
        select:['_id','name'],
        match:{
            name:{$regex:'.*'+stade+'.*',$options:'i'}
        }
    }
   ])
   if(data)
    return res.json({data});
return res.status(400).json({err:data});
}
exports.numberOfTicketBySaller=async (req,res)=>{
    const data=await Ticket.aggregate([
        {
            $group:{_id:"saller",count:{$sum:1}}
        },
        {
            $lookup:{
                from:"users",
                localField:"_id.saller",
                foreignField:"saller",
                as:"saller"
            }
        },{
            $project:{
                "stade.photo":0,
                "saller.unwantedField":0
            }
        }
    ])
    if(data)
        return res.json({data})
    return res.status(400).json({err:data})
}
// get the number of the ticket by stade
exports.numberOfTicketByStade=async (req,res)=>{
const data_new=await Ticket.aggregate([
    {
        $group:{_id:"$stade",count:{$sum:1}}
    },{
        $lookup:{
            from:"stades",
            localField:"_id.stade",
            foreignField:"stade",
            as:"stade"
        }
    },
    {
        $project: {
"stade.photo": 0, // Exclude 'photo' field
      "stade.unwantedField": 0    }
    }
]) 
    if(data_new)
        return res.json({data_new})
    return res.status(400).json({err:data_new})

}

