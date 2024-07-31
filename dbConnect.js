require('dotenv').config();
const mongoose=require('mongoose')
connectToDB=()=>{
    //Connecting to Mongo DB...
    mongoose.connect(`mongodb+srv://prateek88786:${process.env.DB_PASS}@cluster0.dwo5jsc.mongodb.net/test`).then(
        ()=>{
            console.log("Succesfully Connected to DB...")
        }
    ).catch((err)=>{
        console.log("Error Connecting to DB: "+err)
    })

}

module.exports=connectToDB