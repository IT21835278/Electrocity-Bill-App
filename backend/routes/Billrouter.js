const express =require("express");
const { CalBill } = require("../controllers/Billcontoler");
const router = express.Router();

router.post("/",CalBill);

module.exports = router;