const express =require("express");
const { CalBill, getBillByID, createUnitPrice, getLastMonthRecod } = require("../controllers/Billcontoler");
const router = express.Router();
const protect = require("../middleWare/authMiddleware")

router.post("/",CalBill);
router.get("/bill-history",protect,getBillByID)
router.get("/get-last-month-records",protect ,getLastMonthRecod)


//

module.exports = router;