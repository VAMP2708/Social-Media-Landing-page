// logic for singup

const userSchema = require('../model/user');
const bcrypt = require('bcrypt');
const generatetoken = require('../utils/generatetoken')
const registeruser = async(req,res)=>{
    try {
        const {username,email,password} = req.body;
    if(!username || !email || !password){
        return res.status(404).json({message:"All fields are empty."})
    }
    const nameexists = await userSchema.findOne({username})
    if(nameexists){
        return res.status(404).json({message:"username already exist!.please use another name"})
    }
    const emailexist = await userSchema.findOne({email});

    if(emailexist){
        return res.status(404).json({message:"email already in use!. please choose other"})
    }

   const hashedpassword = await bcrypt.hash(password,10)

   const user = new userSchema({
    username,
    email,
    password:hashedpassword
   })
   await user.save();
   return res.status(200).json({message:"registered successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:" error registering user"})
    }
}

const loginuser = async(req,res)=>{
    try {
        const {username,email,password} = req.body;
        if(!username || !email || !password){
        return res.status(404).json({message:"All fields are empty."})
    }
    const nameexists = await userSchema.findOne({username})
    const userexist = await userSchema.findOne({email});

    if(!nameexists || !userexist){
        return res.status(404).json({message:'user does not exists.please register'})
    }
    const validpassword =  await bcrypt.compare(password,userexist.password)
    if(!validpassword){
        return res.status(404).json({message:"invalid password"})
    }
    const token = generatetoken(userexist._id)
    return res.status(200).json({
        message:"successfully logged in!",
        token,
        user:{
            id:userexist._id,
            username:userexist.username,
            email:userexist.email
        }
    })

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error logging in!"})
    }
}

module.exports = {registeruser,loginuser}