const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const path =require("path");
const cors = require("cors");
const errorHandler = require ("./middleWare/errorMiddleWare")
const cookieParser = require("cookie-parser")

const userRoutes = require("./routes/userRoutes");
const Billrouter = require("./routes/Billrouter")
const UnitPriceRoutes = require("./routes/UnitPriceRoutes")

const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(express.urlencoded({extended:false}));

//routes
app.use("/api/users",userRoutes)
app.use("/api/bill",Billrouter)
app.use("/api/unit",UnitPriceRoutes)


app.use(errorHandler);


//DB connection
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () =>{
            console.log(`server Running is port ${PORT} 🚀 `);
        })
    })
    .catch((err)=>console.log(err))
