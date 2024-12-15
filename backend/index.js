const mongoose=require("mongoose")
const express=require("express");
const cors=require("cors")
require("dotenv").config()
const PORT=process.env.PORT || 800
const app=express();
const userRoute=require("./routes/userRoutes")
const stadeRoute=require("./routes/stadRoutes");
app.use(cors())
app.use(express.json());
app.use('/API/users',userRoute);
app.use("/API/stades",stadeRoute);
const DATABASE=process.env.DATABASE;
mongoose.connect(DATABASE).then(()=>{
    console.log("Database Connected ")
}).catch((err)=>{
    console.log(err)
})
app.listen(PORT,()=>{
    console.log(`app running on a port ${PORT}`)
})