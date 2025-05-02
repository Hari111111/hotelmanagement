const jwt = require("jsonwebtoken");

const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({message:"Access denied, No token is provided"});

    try{
        const decoded = jwt.verify(token,'48c134834976378ca2a47a08c50a07274c7b51c7e0b8a786d1afa2bcf159e1c78d9503ce242d8062f7b2d79662ed1837df2e9738b03c76f7b2d67c2c0c0f522b');
        req.user = decoded;
        next();
    }catch(err){
       res.status(401).json({message:"invalid token"});
    }
}

module.exports = auth;