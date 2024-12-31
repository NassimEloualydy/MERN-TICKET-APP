const Event=require("../models/event");
const formidable=require("formidable");
const fs=require("fs");
exports.submitEvent=async (req,res)=>{
const form=formidable.IncomingForm()
form.KeepExtensions=true;
form.parse(req,async (err,fields,files)=>{
    const {_id,name,city,contry,date,status}=fields;
    if(_id==""){
        console.log("Create")
        var event=await Event.find({name}).select("-photo")
        if(event.length!=0)
            return res.status(400).json({err:"Please the name is alread"})
        const e=await Event.create({
            name,city,contry,date,status,
            photo:{
                data:fs.readFileSync(files.photo.path),
                contentType:files.photo.type
            }
        })
        if(e)
            return res.json({message:"Event Added With Success !!"})
            return res.status(400).json({err:e})
    }else{
        var event=await Event.find().select("-photo").and([{_id:{$ne:_id}},{name}])
        if(event.length!=0)
            return res.status(400).json({err:"Please the name is alread"})
        var e=await Event.findOneAndUpdate({_id},{
            $set:{
                name,city,contry,date,status,

            }
        },{$new:true})
        if(files.photo)
        e=await Event.findOneAndUpdate({_id},{
            $set:{
                name,city,contry,date,status,
                photo:{
                    data:fs.readFileSync(files.photo.path),
                    contentType:files.photo.type
                }
            }
        },{$new:true})
        if(e)
            return res.json({message:"Event Added With Success !!"})
            return res.status(400).json({err:e})
        
    }
})
}
exports.deleteEvent=async (req,res)=>{
    const {_id}=req.body;
    const event=await Event.findOneAndDelete({_id})
    if(event)
        return res.json({message:"Deleted With Success !!"})
        return res.status(400).json({err:event})
}

exports.getData=async (req,res)=>{
  const {name,city,contry,date,status}=req.body;
  const searchQuery={}
  searchQuery.name={$regex:".*"+name+".*",$options:'i'}
  searchQuery.city={$regex:".*"+city+".*",$options:'i'}
  searchQuery.contry={$regex:".*"+contry+".*",$options:'i'}
  searchQuery.date={$regex:".*"+date+".*",$options:'i'}
  searchQuery.status={$regex:".*"+status+".*",$options:'i'}
  const data=await Event.find(searchQuery).select("-photo")
  if(data)
    return res.json({data})
return res.status(400).json({err:data});
}   
