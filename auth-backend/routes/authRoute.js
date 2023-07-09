const express = require("express");
const { createUser, loginUserCtrl, logout ,updateUser,getAll, getUser} = require("../controller/userCtrl");
const {authMiddleware} =require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/logout",logout);
router.put("/update",authMiddleware,updateUser);
router.get('/single/:email',getUser); // user with username
router.get("/get",getAll);






module.exports = router;