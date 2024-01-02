const mongoose = require("mongoose");

const UnitPrice = mongoose.Schema(
    {
        Unit0to30:{
            type:Number,
            default:0.0
        }, 

        Unit30to60:{
            type:Number,
            default:0.0
        },

        Unit0to60:{
            type:Number,
            default:0.0
        },

        Unit60to90:{
            type:Number,
            default:0.0
        }, 

        Unit90to120:{
            type:Number,
            default:0.0
        }, 

        Unit121to180:{
            type:Number,
            default:0.0
        },

        UnitAbove180:{
            type:Number,
            default:0.0
        }, 

        Fix0to30:{
            type:Number,
            default:0.0
        },

        Fix30to60:{
            type:Number,
            default:0.0
        },
 

        Fix60to90:{
            type:Number,
            default:0.0
        }, 

        Fix90to120:{
            type:Number,
            default:0.0
        }, 
        
        Fix120to180:{
            type:Number,
            default:0.0
        },

        FixAbove180:{
            type:Number,
            default:0.0
        },


    },

    {
        timestamps:true
    }
);





const unitPrice = mongoose.model("unitPrice",UnitPrice)

module.exports = unitPrice;
