const express = require("express");
const router = express.Router();

// Starter endpoint. The team will add book CRUD routes here.
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Book API is ready for development",
    data: []
  });
});

module.exports = router;
