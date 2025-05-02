const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req,res)=>{
    const {userName,email,password,role} = req.body;
    try{
        const checkUniqueMail = await User.findOne({where:{email}});
        
        if(checkUniqueMail) return res.status(201).json({message:"Email already exists"});

        const hashedPassword =  await  bcrypt.hash(password,10);
        const user = await User.create({
               userName,
               email,
               password:hashedPassword,
               role
        });

        res.status(201).json({message:"User Registered Successfully",user});
    }
    catch(error){
        res.status(500).json({ message: "Something went wrong testing", error: error.message });
    }
}

const login = async(req,res)=>{
    try{   
         const {email,password}= req.body;
         console.log(email,password);
         const user = await User.findOne({where:{email}});
         if(!user) return res.status(400).json({message:"User not find"})

        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"Password is incorrect"});

        const token = jwt.sign({id:user.id,role:user.role},'48c134834976378ca2a47a08c50a07274c7b51c7e0b8a786d1afa2bcf159e1c78d9503ce242d8062f7b2d79662ed1837df2e9738b03c76f7b2d67c2c0c0f522b',{expiresIn:'2h'})
         
        return res.json({token});
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Error logging in',err:err.message });
    }
};

module.exports = {register,login}