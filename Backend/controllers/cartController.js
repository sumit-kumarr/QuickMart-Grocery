

//update Cart Data

import userModel from "../models/user.js"

export const updateCart = async(req,res)=>{
    try {
        const { userId, cartItems } = req.body;
        await userModel.findByIdAndUpdate(userId, { cartItems });
        res.json({ success: true, message: "Cart Updated" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}