const { error } = require("console");
const User = require("../models/customerModel")
const monthRecod = require("../models/MonthBillReco")
const asyncHandler = require("express-async-handler")

const CalBill = asyncHandler(async(req,res) =>{
    const {meterRead,AccountID} = req.body
    console.log(AccountID);
    console.log(meterRead);


    const userExist = await User.findOne({AccountID})
    if(!userExist){
        res.status(400)
        throw new Error ("The Account does not existing")
    }

    const calUnit = meterRead - userExist.lastMeter
    let price = 0.0

    if(calUnit > 180){
        price= 2360+(38*60)+(41*30)+(59*30)+(59*30)+(89*(calUnit-180))
    }

    else if(calUnit > 120 ){
        price= 1770+(38*60)+(41*30)+(59*30)+(59*(calUnit-120))
    }

    else if(calUnit > 90 ){
        price= 1180+(38*60)+(41*30)+(59*(calUnit-90))
    }

    else if(calUnit > 60 ){
        price= 480+(38*60)+(41*30)+(41*(calUnit-60))
    }

    else if(calUnit >  30){
        price= 360+(12*30)+(30*(calUnit-30))
    }

    else if(calUnit > 0){
        price= 180+(12*calUnit)
    }

    // else{
    //     price=-99
    // }

    const record = await monthRecod.create({
        AccountID,
        CusID:userExist._id,
        meterRead,
        bill:price,
    })

     const newAmount = userExist.amount + price

     await User.updateOne(
        { AccountID: { $eq: AccountID } },
        {$set:{amount:newAmount, lastMeter:meterRead}}

     )
      res.json({ success: true, data: record });





})


module.exports = {
    CalBill,
    
}
