require("dotenv").config()
const express=require("express")
const app=express()
const cors=require("cors")
const notes=require("./data/data")
const connectdb=require("./config/connectdb")
const mongoose=require("mongoose")

const verifyJwt=require("./middleware/verifyJwt")
const PORT=process.env.PORT || 3000


connectdb()
app.use(cors())
app.use(express.json())

console.log(process.env.MONGODB_URI,"uri")
app.use("/api/user",require("./route/user"))
app.use("/api/refresh",require("./route/refreshroute"))
//app.use(verifyJwt)
app.use("/api/note",require("./route/note"))



app.listen(PORT,()=>{console.log(`server starts at port ${PORT}`)})




 

