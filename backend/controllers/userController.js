const { error } = require("console");
const User = require("../models/customerModel")
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");

const genarateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
}


//registering user
const registerUser = asyncHandler (async(req,res) =>{
    const {name, Email, password,NIC,phone,ActiveStatus,Address,district,city,AccountID} = req.body
    //validation
    if(!name || !Email || !password){
        res.status(400)
        throw new Error("Pleace fill in all required filds")
    }
    if(password.length<6){
        res.status(400)
        throw new Error("Password must be up to 6")
    }
    // if(phone.length!==10){
    //     res.status(400)
    //     throw new Error ("Pleace enter Correct mobile Number")
    // }

    //check user email alrady exist

    const AccExist = await User.findOne({AccountID})
    if(AccExist){
        res.status(400)
        throw new Error("That account alrady use")
    }

    const userExist = await User.findOne({Email})
    if(userExist){
        res.status(400)
        throw new Error("E mail alrady use")
    }

    //create new user
    const user = await User.create(
        {
            name,
            Email,
            password,
            phone,
            NIC,
            Address,
            city,
            district,
            AccountID,
            ActiveStatus
    })

     //Genarate tokenghghghg
     const token = genarateToken(user._id)

     //sent HTTP-only cookie
     res.cookie("token", token, {
        path:"/",
        httpOnly:true,
        expires: new Date(Date.now()+1000*86400), //1day
        sameSite:"none",
        secure:true

     })

    if(user){
        const {_id, name, Email, password,NIC,phone,ActiveStatus,token,Address} =user
        res.status(201).json(
            {
                _id,
                name,
                Email,
                password,
                phone,
                NIC,
                Address,
                ActiveStatus,
                token,
                
            }
        )
    }else {
        res.status(400)
        throw new Error ("Inavalid user data")
    }
});




//login user
const loginUser = asyncHandler(
    async(req,res) =>{
        
        const{Email, password} = req.body
        console.log(Email);
        console.log(password);
        //validate
        if(!Email || !password){
            res.status(400)
            throw new Error("Fill this filds")
        }

        //if exist user
        const user = await User.findOne({Email})
        if(!user){
            res.status(400)
            throw new Error("User not exist")
        }

        //user exist check pwd
        const passwordIsCorrect = await bcrypt.compare(password, user.password)

        //Genarate token
        const token = genarateToken(user._id)

        //sent HTTP-only cookie
        res.cookie("token", token, {
            path:"/",
            httpOnly:true,
            expires: new Date(Date.now()+1000*86400), //1day
            sameSite:"none",
            secure:true

        })
        console.log(token);

        if(user &&  passwordIsCorrect){
            const {_id, name, Email, password,NIC,phone,ActiveStatus,Address }=user
            res.status(200).json(
            {
                _id,
                name,
                Email,
                password,
                phone,
                NIC,
                Address,
                ActiveStatus,
                token,
                
            }
           
        )
        console.log(token);
            
        }else{
            res.status(400)
            throw new Error ("Password incorrect") 
        }


    }
)


//logout iser
const logout = asyncHandler (async(req,res)=>{
    res.cookie("token", "", {
        path:"/",
        httpOnly:true,
        expires: new Date(0), //expire
        sameSite:"none",
        secure:true

    })
    console.log("log out");
    return res.status(200).json({message: "Successfuly log out"});

})


//login status
const loginStates = asyncHandler(async(req, res) =>{
    const token = req.cookies.token

    if(!token){
        return res.json(false)
    }


    //verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if(verified){
        return res.json(true)
    }

    return res.json(false)


   
})


//All users details
const getAllUser = asyncHandler(async(req, res) =>{
    const user = await User.find()
    res.status(200).json(user)
})

//get user by ID
const getUserById = asyncHandler(async(req,res)=>{
    try{
        const userID = req.params.userId
        const user = await User.findById(userID)

        res.json(user)

    }catch(error){
        res.status(500).json({message:"Do not have any details"})
    }
})


const getUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)

    if(user){
        const {_id, name, Email, password, phone, NIC, Address, ActiveStatus,AccountID,city,district,lastMeter,amount } =user
        res.status(200).json(
            {
                _id,
                name,
                Email,
                password,
                phone,
                NIC,
                Address,
                ActiveStatus,
                AccountID,
                city,
                district,
                lastMeter,
                amount,

            }
        )
    }else{
        res.status(400)
        throw new Error ("User not exist!")
    }
})





module.exports = {
    registerUser,
    loginUser,
    logout,
    getAllUser,
    getUserById,
    getUser
    
}