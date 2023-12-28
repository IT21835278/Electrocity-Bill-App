const mongoose = require("mongoose");

const MonthRecod= mongoose.Schema(
    {
        AccountID:{
            type:String
        },

        
        CusID:{
            type:String,
            require:true,
        },

        date:{
            type:Date,
            default: Date.now 
        },

        meterRead:{
            type:Number,
            require:true,
        },

        bill:{
            type:Number,
            default:0.0
        }


    },

    {
        timestamps:true
    }
);





const monthRecod = mongoose.model("MonthRecod",MonthRecord)

module.exports = monthRecod;
