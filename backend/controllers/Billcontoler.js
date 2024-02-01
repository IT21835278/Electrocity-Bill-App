const { error } = require("console");
const User = require("../models/customerModel");
const monthRecod = require("../models/MonthBillReco")
const asyncHandler = require("express-async-handler");
const UnitPrice = require("../models/UnitPriceModel");

const CalBill = asyncHandler(async (req, res) => {
    try {
        const { meterRead, AccountID } = req.body;
        console.log("AccountID:", AccountID);
        console.log("meterRead:", meterRead);

        const userExist = await User.findOne({ AccountID });
        if (!userExist) {
            res.status(400);
            throw new Error("The Account does not exist");
        }

        const units = await UnitPrice.findById({_id:`65942fa018ec8cf9063e793b`})

        const calUnit = meterRead - userExist.lastMeter;
        let price = 0.0;

        if (calUnit > 180) {
            price = units.FixAbove180 + units.Unit0to60 * 60 + units.Unit60to90 * 30 + units.Unit90to120 * 30 + units.Unit121to180 * 30 + units.UnitAbove180 * (calUnit - 180);
        } else if (calUnit > 120) {
            price = units.Fix120to180 + units.Unit0to60 * 60 + units.Unit60to90 * 30 + units.Unit90to120 * 30 + units.Unit121to180 * (calUnit - 120);
        } else if (calUnit > 90) {
            price = units.Fix90to120 + units.Unit0to60 * 60 + units.Unit60to90 * 30 + units.Unit90to120 * (calUnit - 90);
        } else if (calUnit > 60) {
            price = units.Fix60to90 + units.Unit0to60 * 60 + units.Unit60to90 * (calUnit - 60);
        } else if (calUnit > 30) {
            price = units.Fix30to60 + units.Unit0to30 * 30 + units.Unit30to60 * (calUnit - 30);
        } else if (calUnit > 0) {
            price = units.Fix0to30 + units.Unit0to30 * calUnit;
        } else {
            price = -99;
        }

        const record = await monthRecod.create({
            AccountID,
            CusID: userExist._id,
            meterRead,
            bill: price,
        });

        const newAmount = userExist.amount + price;

        await User.updateOne(
            { AccountID: { $eq: AccountID } },
            { $set: { amount: newAmount, lastMeter: meterRead } }
        );

        res.json({ success: true, data: record });
    } catch (error) {
        console.error("Error in CalBill:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});


//get bill history
const getBillByID = asyncHandler(async(req,res)=>{
    try{
        const billReco = await monthRecod.find({CusID: {$eq: req.user._id}}).sort({date:-1})

        res.json(billReco)

    }catch(error){
        res.status(500).json({message:"Does not have details"})
    }
})


const getLastMonthRecod = asyncHandler(async(req,res)=>{
    try{
        const record = await monthRecod.find({CusID: {$eq: req.user._id}}).sort({ date: -1 }).limit(1)
        res.json(record)
    }catch(error){
        res.status(500).json({message:"Does not have details"})
    }
})







module.exports = {
    CalBill,
    getBillByID,
    getLastMonthRecod
}
