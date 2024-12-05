const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protectRoute = async (req, res, next) => {
  try {
    //get token from cookies
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });

    //decode the token with jwt key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded)
      return res.status(401).json({ message: "Unauthorized - Invalid Token " });

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ message: "user not found" });

    req.user = user;
    next();

  } catch (error) {
    console.log("Error in protectRoute Middleware", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = protectRoute;
