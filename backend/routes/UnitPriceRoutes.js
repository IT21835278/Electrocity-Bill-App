const express =require("express");
const { createUnitPrice, updateUnitPrice, getUnitsPrice } = require("../controllers/UnitPriceControler");
const router = express.Router();

router.post("/createUnit",createUnitPrice)
router.patch("/",updateUnitPrice)
router.get("/",getUnitsPrice)


module.exports = router;