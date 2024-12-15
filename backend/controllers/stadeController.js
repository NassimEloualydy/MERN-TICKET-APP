const Stade=require("../models/stade");
const formidable=require("formidable");
const fs=require("fs");
exports.deleteStade=async (req,res)=>{
    const {_id}=req.body;
    const st=await Stade.findOneAndDelete({_id})
    if(st)
        return res.json({message:"Stade deleted with success !!"})
        return res.status(400).json({err:st})
        
}
exports.addStade=async (req,res)=>{
    const form=formidable.IncomingForm()
    form.keepExtentions=true;
    form.parse(req, async (err,fields,files)=>{
        const {name, _id,
            city,
            nbr_places,
            adresse,
            status}=fields;
        if(_id!=""){
            var s=await Stade.find().select("-photo").and([{_id:{$ne:_id}},{name}]);
            if(s.length!=0)
                return res.status(400).json({err:"The name is already exist !!"})
            s=await Stade.find().select("-photo").and([{_id:{$ne:_id}},{adresse}]);
            if(s.length!=0)
                return res.status(400).json({err:"The adresse is already exist !!"})
            const dataUpdate={
                name,
                city,
                nbr_places,
                adresse,
                status,
                }
            if(files.photo){
                dataUpdate.photo={
                    data:fs.readFileSync(files.photo.path),
                    contentType:files.photo.type
                }
            }
            const st=await Stade.findOneAndUpdate(
                {_id},
                {$set:dataUpdate},
                {$new:true}
            )
            if(st)
                return res.json({message:"Stade Updated wit success !!"})
                return res.status(400).json({err:st})

        }
        if(_id==""){               
            var s=await Stade.find({name}).select("-photo");
            if(s.length!=0)
                return res.status(400).json({err:"The name is already exist !!"})
            s=await Stade.find({adresse}).select("-photo");
            if(s.length!=0)
                return res.status(400).json({err:"The adresse is already exist !!"})
            const st=await Stade.create({
                name,
                city,
                nbr_places,
                adresse,
                status,
                photo:{
                    data:fs.readFileSync(files.photo.path),
                    contentType:files.photo.type
                }
            })
            if(st)
                return res.json({message:"Stade created wit success !!"})
                return res.status(400).json({err:st})
        }
    })

    
}

exports.getData=async (req,res)=>{
    const {name,
        city,
        nbr_places,
        adresse,
        status}=req.body;
    const searchQuery={}
    searchQuery.name={$regex:'.*'+name+'.*',$options:'i'}
    searchQuery.city={$regex:'.*'+city+'.*',$options:'i'}
    searchQuery.nbr_places={$regex:'.*'+nbr_places+'.*',$options:'i'}
    searchQuery.adresse={$regex:'.*'+adresse+'.*',$options:'i'}
    searchQuery.status={$regex:'.*'+status+'.*',$options:'i'}
    const data=await Stade.find(searchQuery).select("-photo")
    if(data)
        return res.json({data})
    return res.status(400).json({err:data})
}