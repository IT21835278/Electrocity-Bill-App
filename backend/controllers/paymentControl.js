const { error, log } = require("console");
const asyncHandler = require("express-async-handler");
const User = require("../models/customerModel");
const PaymentRecoed = require("../models/paymentModel");
const { v4: uuidv4 } = require('uuid');


const  PayBill =asyncHandler(async(req,res) => {
    try{
        const {payment,_id} = req.body
        console.log(payment);

        const userExist = await User.findById(_id)
        const uniqueId = uuidv4();
        const newAmount = userExist.amount - payment
        const AccountID = userExist.AccountID
        console.log(newAmount);

        const pay =await PaymentRecoed.create({
            transactionID:uniqueId,
            AccountID:userExist.AccountID,
            CusID: userExist._id,
            lastAmount:userExist.amount,
            payment,
            amount:newAmount,
        })

        await User.updateOne(
            { AccountID: { $eq: AccountID } },
            { $set: { amount: newAmount} }
        )

        res.json({success:true, data:pay})

    }catch(error){
        console.error("Error in CalBill:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }


})

module.exports = {
    PayBill
}

