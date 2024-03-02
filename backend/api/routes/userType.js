const express = require("express");
const router = express.Router();
const cors = require("cors");

// Middleware
const tokenVerification = require("../../middleware/verify");

router.get("/", tokenVerification, async (req, res) => {
  try {
    const userType = req.user.userType;
    res.status(200).json({ status: "success", UserType: userType });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;
