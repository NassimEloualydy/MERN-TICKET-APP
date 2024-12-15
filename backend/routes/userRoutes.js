const express=require("express");
const Route=express.Router();
const {sigInUser,logIn,updateAccount}=require("../controllers/userController")
const {auth}=require("../middleware/auth");
Route.post('/sigInUser',sigInUser);
Route.post("/logIn",logIn);
Route.post("/updateAccount",auth,updateAccount)
module.exports=Route;


