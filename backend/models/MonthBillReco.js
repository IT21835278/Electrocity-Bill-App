const mongoose = require("mongoose");

const MonthRecord= mongoose.Schema(
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
            default:0,
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





const monthRecod = mongoose.model("monthRecod",MonthRecord)

module.exports = monthRecod;
