import { User } from "../model/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const registerUser = async (req, res) => {
  try {
    const { username, email, password, gender } = req.body;
    if (!username || !email || !password || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const isExists = await User.findOne({ email });
    if (isExists) {
      return res.status(409).json({ message: "User with this email already exists" });
    }
    const user = await User.create({
      username,
      email,
      password,
      gender,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        gender: user.gender,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({message:"missing fields are required"})
        }
        const userExist=await User.findOne({email})
        if(!userExist){
            return res.status(404).json({message:"User not found"})
        }
        const isPasswordCorrect=await bcrypt.compare(password,userExist.password)
          if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const access_token=jwt.sign(
        {id:userExist._id,email:userExist.email},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"1d"}
    )
     res.cookie("access_token", access_token, {
      httpOnly: true,      
      secure: false,
      sameSite: "strict",   
      maxAge: 24 * 60 * 60 * 1000, 
    });
     return res.status(200).json({
      message: "Login successful",
      access_token,
      user: {
        id: userExist._id,
        username: userExist.username,
        email: userExist.email,
        gender: userExist.gender,
      },
    });

    } catch (error) {
         return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export{
    registerUser,
    loginUser
}