const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const UnitPrice = mongoose.Schema(
    {
        Unit0to60:{
            type:Double,
            default:0.0
        }, 

        Unit60to90:{
            type:Double,
            default:0.0
        }, 

        Unit90to120:{
            type:Double,
            default:0.0
        }, 

        Unit121to180:{
            type:Double,
            default:0.0
        }, 


    },

    {
        timestamps:true
    }
);





const unitPrice = mongoose.model("UnitPrice",Price)

module.exports = unitPrice;
