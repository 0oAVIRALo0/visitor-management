const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");

router.use(cookieParser());

const db = require("../../database/db");

// Middleware
const tokenVerification = require("../../middleware/verify");

router.post("/", tokenVerification, async (req, res) => {
  try {
    const attendantID = req.body.attendantID;

    console.log("Attendant ID:", attendantID);

    const deleteMeetingRequestQuery = `
            DELETE FROM MeetingRequests
            WHERE SenderID = ?
        `;

    const dbDeleteResult = await db.pool
      .promise()
      .execute(deleteMeetingRequestQuery, [attendantID]);

    console.log("Meeting Created:", dbInsertResult);
    res.status(200).json({
      status: "success",
      message: "Meeting Created",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
