import jwt from "jsonwebtoken";

 const authUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({ success: false, message: "NOt Authorized" });
    }

    next();
  } catch (error) {
    res.json({ success: false, message: "Not Authorized" });
  }
};

export default authUser;