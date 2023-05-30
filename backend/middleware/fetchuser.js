var jwt=require('jsonwebtoken')
const JWT_SECRET='Arham@2$0$0$3'

const fetchuser=(req,res,next)=>{
    //Get the user from the jwt token and add id to req object
    const token=req.header('auth-token')
    if(!token){
        res.status(401).send({error:"please authenticate using valid token"})
    }
    try {
        const data=jwt.verify(token,JWT_SECRET)
        req.user=data.user
        next() //calls the next fn after middleware
    } 
    catch (error) {
        console.log(error.message)
        res.status(401).send({error:"please authenticate using valid token"})
    }
    
}

module.exports=fetchuser