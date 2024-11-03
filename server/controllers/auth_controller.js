import bcryptjs from 'bcryptjs'
import {User} from "../models/user_model.js"
import {errorHandler} from "../utils/error.js"
import jwt from "jsonwebtoken"


export const signup = async(req,res, next) => {
    const {username, email, password} = req.body; 
    const hashpwd = bcryptjs.hashSync(password,10);

    const newUser = new User({username, email, password:hashpwd})
    
    try {
        await newUser.save();
        res.status(200).json("User has been created successfully");
    } catch (error) {
        next(error)
    }

} 

export const signin = async(req,res,next) => {
    
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404, 'User not found!!'))
        const validPWD = bcryptjs.compareSync(password, validUser.password);
        if(!validPWD) return next(errorHandler(401,'Wrong Credentials!!'))

        const token = jwt.sign({id:validUser._id}, process.env.SECRET_KEY);
        const {password:pass, ...rest} = validUser._doc;
        res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)
    } catch (error) {
        next(error)
    }
}
