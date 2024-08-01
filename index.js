require('dotenv').config();
const express=require('express') 
const app=express()
const mongoose=require('mongoose')
const connectToDB=require('./dbConnect.js')
const cors = require('cors');
app.use(cors());

app.use(express.json())
connectToDB()


//User Schema...
const user=mongoose.model('user',{
    name:String,
    age:Number,
    email:String
})

app.get("/",(req,res)=>{
    res.send("Server is Running...")
})

//Endpoint to handle user registration...
app.post('/api/register',async(req,res)=>{
    const { name, email, age } = req.body;
    age=parseInt(age);
    const errors = [];

    // Validate name...
    const nameRegex = /^[A-Za-z]+$/;
    if (typeof name !== 'string' || !nameRegex.test(name)) {
        errors.push({ param:'name', msg:'Name is required and should contain only alphabets' });
    }

    // Validate email...
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== 'string' || !emailRegex.test(email)) {
        errors.push({ param:'email', msg:'Email is required and should be a valid email address' });
    }

    // Validate age...
    if (typeof age !== 'number' || age < 0 || !Number.isInteger(age)) {
        errors.push({ param:'age', msg:'Age is required and should be a non-negative integer' });
    }

    if(errors.length>0){
        res.json(errors)
    }
    else{
        await user.insertMany(req.body)
        console.log("A new user added...")
        res.send("Success")
    }


    
})


//Endpoint to retrieve all user data...
app.get('/api/users',async(req,res)=>{
    const data=await user.find()
    res.json(data)
})



app.listen(process.env.PORT,(req,res)=>{
    console.log("Server Running...")
}) 

module.exports = (req, res) => {
    app(req, res);
};