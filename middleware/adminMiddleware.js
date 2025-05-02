const adminOnly = (req,res,next)=>{
    if(req.user.role !== 'admin'){
   return res.status(403).json({message:"Admin can perform crud"});
    }
    next();
}

module.exports=adminOnly;