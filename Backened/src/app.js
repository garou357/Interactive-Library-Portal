const express = require("express")
const path = require('path')
const PORT = process.env.PORT || 3000
require("./db/conn")
const app = express()
const userModel = require("../src/models/userSchema")
app.use(express.urlencoded({
    extended:false
}))
// const static_path = path.join(__dirname,"../../")
// app.use(express.static(static_path))
app.use(express.static(path.join(__dirname,'../../')));
app.listen(PORT,()=>{
    console.log("Listening on port 3000")
})
app.get("/",(req,res)=>{
    // res.redirect('../../index')
    res.sendFile(path.join(__dirname, '../../index.html'));
    console.log(__dirname)
})
app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname, '../../login.html'));
})
app.get("/userRegister",(req,res)=>{
    res.sendFile(path.join(__dirname, '../../userRegister.html'));
})
app.post("/userRegister",async (req,res)=>{
    try{
        const password =  req.body.password
        const cpassword = req.body.confirmpassword
        const username = req.body.username
        const email = req.body.email
        if(password == cpassword)
        {
            const user = new userModel({
                Name:username,
                Email:email,
                Password:password,
                ConfirmPassword:cpassword
            })
            const registeredUser = await user.save()
            res.status(201).sendFile(path.join(__dirname, '../../index.html'))
            
        }
        else
        {
            
            res.send("Password mismatch")
        }
    }
    catch(error)
    {
        res.status(400).send(error)
    }
})

