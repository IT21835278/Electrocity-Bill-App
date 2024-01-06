const mongoose = require("mongoose");

const Payment= mongoose.Schema(
    {

        transactionID:{
            type:String,
            uniqe:true,
        },

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

        payment:{
            type:Number,
            default:0,
            require:true,
        },

        lastAmount:{
            type:Number,
            default:0.0
        },

        amount:{
            type:Number,
            default:0.0
        }


    },

    {
        timestamps:true
    }
);





const PaymentRecoed = mongoose.model("payment",Payment)

module.exports = PaymentRecoed;
