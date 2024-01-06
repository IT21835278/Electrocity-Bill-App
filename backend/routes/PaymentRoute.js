const express =require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const { PayBill } = require("../controllers/paymentControl");

router.post("/",PayBill)

module.exports = router;