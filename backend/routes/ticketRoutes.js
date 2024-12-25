const express=require("express");
const Router=express.Router();
const {submitTicket,getData,deleteTciket,numberOfTicketByStade,numberOfTicketBySaller}=require("../controllers/ticketController");
const {auth}=require("../middleware/auth")
Router.post("/submitTicket",auth,submitTicket)
Router.post("/deleteTciket",auth,deleteTciket)
Router.post("/getData",auth,getData)
Router.post('/numberOfTicketByStade',auth,numberOfTicketByStade);
Router.post("/numberOfTicketBySaller",auth,numberOfTicketBySaller);
module.exports=Router;

