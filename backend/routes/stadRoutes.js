const expres=require("express");
const router=expres.Router();
const {auth}=require("../middleware/auth")
const {addStade,deleteStade,getData}=require("../controllers/stadeController");
router.post("/addStade",auth,addStade);
router.post("/deleteStade",auth,deleteStade);
router.post("/getData",auth,getData)
module.exports=router
