const express = require("express");
const protectRoute = require("../middleware/protect.route.middleware");
const { getUsersForSidebar, getMessages, sendMessage } = require("../controllers/message.controller");
const router = express.Router();

// User routes
router.get("/users", protectRoute, getUsersForSidebar); 
router.get("/:id", protectRoute, getMessages); 
router.post("/send/:id", protectRoute, sendMessage);

module.exports = router;
