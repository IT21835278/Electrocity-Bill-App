const express =require("express");
const { CalBill, getBillByID, createUnitPrice } = require("../controllers/Billcontoler");
const router = express.Router();

router.post("/",CalBill);
router.get("/bill-history/:userId",getBillByID)


//

module.exports = router;