import jwt from "jsonwebtoken";

 const authUser = async (req, res, next) => {
  const { token } = req.cookies;
  console.log("authUser - token:", token ? "exists" : "missing"); // Debug log
  
  if (!token) {
    return res.json({ success: false, message: "Not Authorized" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("authUser - decoded token:", tokenDecode); // Debug log
    
    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
      console.log("authUser - userId set:", tokenDecode.id); // Debug log
    } else {
      return res.json({ success: false, message: "Not Authorized" });
    }

    next();
  } catch (error) {
    console.log("authUser - token verification failed:", error.message); // Debug log
    res.json({ success: false, message: "Not Authorized" });
  }
};

export default authUser;