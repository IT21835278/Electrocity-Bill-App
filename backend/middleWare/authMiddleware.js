const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../models/customerModel")

const protect = asyncHandler(async(req, res, next)=>{
    try{
        const token = req.cookies.token
        if(!token){
            res.status(401)
            throw new Error ("Not authorized, pleace login")

        }

        //verify token
        const verified = jwt.verify(token,process.env.JWT_SECRET)
        //get the user id from token
        const user = await User.findById(verified.id).select("-password") //without password

        if(!user){
            res.status(401)
            throw new Error ("user not fond")
        }

        req.user = user
        next()


    }catch(error){
        res.status(401)
        throw new Error ("Not authorized, pleace login")

    }
})

module.exports = protect