const Router=require("express").Router();
const {auth}=require("../middleware/auth")
const {submitEvent,deleteEvent,getData}=require("../controllers/eventController")
Router.post("/submitEvent",auth,submitEvent);
Router.post("/deleteEvent",auth,deleteEvent)
Router.post("/getData",auth,getData);
module.exports=Router;
