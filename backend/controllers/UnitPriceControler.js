const { error, log } = require("console");
const asyncHandler = require("express-async-handler");
const UnitPrice = require("../models/UnitPriceModel");

const createUnitPrice = asyncHandler(async (req, res) => {
    try {
        // Extract data from the request body
        const {
            Unit0to30,
            Unit30to60,
            Unit0to60,
            Unit60to90,
            Unit90to120,
            Unit121to180,
            UnitAbove180,
            Fix0to30,
            Fix30to60,
            Fix60to90,
            Fix90to120,
            Fix120to180,
            FixAbove180,
        } = req.body;

        // Convert input values to Decimal128
        const convertToDecimal = (value) => Decimal128.fromString(value.toString());

        // Create a new unitPrice document with the provided values
        const unitprice = await UnitPrice.create({
            Unit0to30,
            Unit30to60,
            Unit0to60,
            Unit60to90,
            Unit90to120,
            Unit121to180,
            UnitAbove180,
            Fix0to30,
            Fix30to60,
            Fix60to90,
            Fix90to120,
            Fix120to180,
            FixAbove180,
        });

        res.status(201).json({ success: true, data: unitprice });
    } catch (error) {
        console.error("Error in createUnitPrice:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});


const updateUnitPrice = asyncHandler(async(req,res)=>{
    const units = await UnitPrice.findById({_id:`65942fa018ec8cf9063e793b`})
    if(units){
        const {
            Unit0to30,
            Unit30to60,
            Unit0to60,
            Unit60to90,
            Unit90to120,
            Unit121to180,
            UnitAbove180,
            Fix0to30,
            Fix30to60,
            Fix60to90,
            Fix90to120,
            Fix120to180,
            FixAbove180,
        } = units

            units.Unit0to30=req.body.Unit0to30 || Unit0to30
            units.Unit30to60=req.body.Unit30to60 || Unit30to60
            units.Unit0to60=req.body.Unit0to60 || Unit0to60
            units.Unit60to90=req.body.Unit60to90 || Unit60to90
            units.Unit90to120=req.body.Unit90to120 || Unit90to120
            units.Unit121to180=req.body.Unit121to180 || Unit121to180
            units.UnitAbove180=req.body.UnitAbove180 || UnitAbove180
            units.Fix0to30=req.body.Fix0to30 || Fix0to30
            units.Fix30to60=req.body.Fix30to60 || Fix30to60
            units.Fix60to90=req.body.Fix60to90 || Fix60to90
            units.Fix90to120=req.body.Fix90to120 || Fix90to120
            units.Fix120to180=req.body.Fix120to180 || Fix120to180
            units.FixAbove180=req.body.FixAbove180 || FixAbove180

            const updateUnits = await units.save()

            res.status(200).json({
                Unit0to30: updateUnits.Unit0to30,
                Unit30to60: updateUnits.Unit30to60,
                Unit0to60: updateUnits.Unit0to60,
                Unit60to90: updateUnits.Unit60to90,
                Unit90to120: updateUnits.Unit90to120,
                Unit121to180: updateUnits.Unit121to180,
                UnitAbove180: updateUnits.UnitAbove180,
                Fix0to30: updateUnits.Fix0to30,
                Fix30to60: updateUnits.Fix30to60,
                Fix60to90: updateUnits.Fix60to90,
                Fix90to120: updateUnits.Fix90to120,
                Fix120to180: updateUnits.Fix120to180,
                FixAbove180: updateUnits.FixAbove180,
            })


            
    }
    else{
        res.status(404)
        throw new Error("No Details")

        }
})

const  getUnitsPrice = asyncHandler(async(req,res)=>{
    const units = await UnitPrice.findOne({_id:`65942fa018ec8cf9063e793b`})

    res.status(200).json(units)

})



module.exports = {
    createUnitPrice,
    updateUnitPrice,
    getUnitsPrice
};
