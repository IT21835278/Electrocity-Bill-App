const express =require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware")


const {registerUser, loginUser, logout, getAllUser, getUserById} = require("../controllers/userController")


router.post("/register",registerUser);
router.post("/",loginUser);
router.get("/",logout)
router.get("/all-users",getAllUser)
router.get("/get-user/:userId",getUserById)

module.exports = router;