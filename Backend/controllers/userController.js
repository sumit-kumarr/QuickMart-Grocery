import jwt from "jsonwebtoken";
import userModel from "../models/user.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "missing details" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.json({ success: false, message: "USer Already Exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, user: { email: user.email, name: user } });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid Email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Email Or Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, user: { email: user.email, name: user } });

  } catch (error) {
   res.json({ success: false, message: error.message });
  }
};


//authuser

export const isAuth = async(req,res)=>{
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ success: false, message: "No token found" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, user });
  } catch (error) {
    console.warn(error.message);
    res.json({ success: false, message: error.message });
  }
}


//logout

export const logout = async(req,res)=>{
  try{
    res.clearCookie('token',{
      httpOnly:true,
      secure:process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({success:true,message:"Logged Out"})

  }catch(error){
    res.json({success:false,message:error.message})

  }
}
