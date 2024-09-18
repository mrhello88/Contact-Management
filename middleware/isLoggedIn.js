exports.isLoggedIn = (req,res,next)=>{
    if(!req.isLoggedIn){
        return res.redirect("/login")
    }
    next()
} 