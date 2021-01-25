import user from '../models/user.js'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import moviesRoutes from '../routes/movies.js'


export const registerUser=async(req,res)=>{
    const {email,password,name}=req.body
    const newUser= new user({email,password,name})
    newUser.password =await newUser.encryptPassword(password)

    try {
        newUser.save()
        const token=jwt.sign({id:newUser._id}, config.secret, {
            expiresIn:180
        })
        res.json({token:token})
        
    } catch (error) {
        res.sendStatus(400)
    }
}

export const loginUser=async(req,res)=>{
    const {password, email} =req.body
    const userFound = await user.findOne({email:email})
    console.log(userFound)
    try {
        if(userFound.comparePassword(password)){
            const token=jwt.sign({id:newUser._id}, config.secret, {
                expiresIn:180
            })
            res.redirect("/user/"+userFound._id)
        }
    } catch (error) {
        res.sendStatus(400)
    }
}