const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../models/user");
require("dotenv").config();

router.post("/login", (req, res) => {
  try {
    const user = req.body.User;

    if (!user) {
      console.log("error adding user ");
      return res.status(401).json({ error: "User not provided" });
    }
    jwt.sign({ user: user });
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
