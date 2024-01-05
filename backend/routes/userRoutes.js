const express =require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware")


const {registerUser, loginUser, logout, getAllUser, getUserById, getUser} = require("../controllers/userController")


router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/",logout)
router.get("/all-users",getAllUser)
router.get("/get-user/:userId",getUserById)
router.get("/get-single-user",protect,getUser)

module.exports = router;