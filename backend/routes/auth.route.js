const express = require("express");
const { signup, login, logout, updateProfile, checkAuth } = require("../controllers/auth.controller");
const protectRoute = require("../middleware/protect.route.middleware");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/profile-update", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth); // Added protectRoute middleware
module.exports = router;