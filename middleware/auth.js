import jwt from "jsonwebtoken";

export const verifyToken=async(req,res,next)=>{
    try{
        let token=req.header("Authorization");
        if(!token)
        {
            res.status(403).send("access denied");
        }
        

        else{
            if(token.startsWith("Bearer "))
        {
           token= token.slice(7,token.length).trimLeft()
        }
            const verified=jwt.verify(token,process.env.JWT_SECRET);
            // console.log(verified)
            req.user=verified;
            
            next();
        }
       
    }
    catch(err)
    {
        res.status(500).json({error:err.message});
    }
}

