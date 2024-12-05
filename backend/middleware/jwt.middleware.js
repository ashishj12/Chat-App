const jwt = require("jsonwebtoken");

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  // Set cookie with the generated token
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only true in production
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: "Strict",
  });

  return token;
};

module.exports = { generateToken };
