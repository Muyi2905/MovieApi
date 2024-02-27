const express = require("express");
const router = express.Router();
const Movie = require("../models/movies.js");

router.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(400).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/movies", async (req, res) => {
  try {
    const new_movie = await req.body.new_movie;
    if (!new_movie) {
      console.error("error adding new movie");
      res.status(400).json({ error: "missing new data" });
    }
    return res.status(200).json(new_movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
