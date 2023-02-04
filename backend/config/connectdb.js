const mongoose=require("mongoose")

const connectdb=async ()=>{
    try{
      const db=await mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      })
      console.log("db is connected")
    }
    catch(err){
       console.log(err)
       process.exit()
    }
}
module.exports=connectdb