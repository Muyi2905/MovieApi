const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../models/user");
require("dotenv").config();

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", verifyToken, (req, res) => {
  try {
    const user = req.body;
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, AuthData) => {
      if (err) {
        res.sendStatus(403).json({ error: "error" });
      } else {
        res.json(AuthData);
      }
    });

    if (!user) {
      console.log("error adding user ");
      return res.status(401).json({ error: "User not provided" });
    }

    jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
      if (err) {
        console.error("Error signing token:", err);
        return res.status(500).json({ error: "Token signing failed" });
      }
      res.json({ token });
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader !== undefined) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403).json({ error: "internal server error" });
  }
}

module.exports = router;
