const express =require("express");
const router = express.Router();
const {registerUser, loginUser, logout} = require("../controllers/userController")
const protect = require("../middleWare/authMiddleware")

router.post("/register",registerUser);
router.post("/",loginUser);
router.get("/",logout)

module.exports = router;