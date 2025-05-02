const {Room, Hotel} = require('../models')

const submit = async(req,res)=>{

    try{
        if(!req.files) return res.status(404).json({message:"Image is not provide"})
        const images = req.files.map(image=>image.filename);

        const rooms = await Room.create({...req.body,images});
        return res.status(201).json({rooms});
    }catch(err){
        return res.status(500).json({error:err.message});
    }
}

const getAll = async(req,res)=>{
    try{
        const rooms = await Room.findAll({include:Hotel});
        return res.json({rooms});

    }catch(err){
        return res.status(500).json({error:err.message});
    }
}

const getOne = async(req,res)=>{
    const id = req.params.id;
    const room= await Room.findByPk(id,{include:Hotel});
    console.log(room);
    return res.json({room});
}

const update = async(req,res)=>{
    const id = req.params.id;
    const room = await Room.findByPk(id);
    if(!room) return res.status(400).json({message:"Data not found"});
    await room.update(req.body);
    return res.json({room});
}

const deleteData = async(req,res)=>{
    const id = req.params.id;
    const room = await Room.findByPk(id);
    if(!room) return res.status(400).json({message:"Data not found"});
    await room.destroy();
    return res.status(201).json({message:"Data deleted Successfully"});
}
module.exports = {
    submit,getAll,getOne,update,deleteData
}