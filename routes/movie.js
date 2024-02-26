const express = require("express");
const router = express.router();
const Movie = require("../models/movies");

router.get("/api/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/api/movies/:id", async (req, res) => {
  try {
    const movies = await Movie.findById();
    res.json(movies);
  } catch (error) {
    
  }
});
