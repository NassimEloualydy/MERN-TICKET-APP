const express=require("express");
const Router=express.Router();
const {submitTicket,deleteTciket}=require("../controllers/ticketController");
const {auth}=require("../middleware/auth")
Router.post("/submitTicket",auth,submitTicket)
Router.post("/deleteTciket",auth,deleteTciket)
module.exports=Router;
