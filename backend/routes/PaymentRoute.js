const express =require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const { PayBill, paymentHistory } = require("../controllers/paymentControl");

router.post("/",PayBill)
router.get("/",protect,paymentHistory)

module.exports = router;