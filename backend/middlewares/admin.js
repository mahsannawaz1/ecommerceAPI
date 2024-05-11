
const admin = (req,res,next)=>{
    if(!req.user.isAdmin){
        res.status(403).send({error:'Admin access denied'})
        return
    }
    next()
}

module.exports = admin