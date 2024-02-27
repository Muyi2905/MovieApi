const express = require("express");
const router = express.Router();
const Show = require("../models/shows");

router.get("/shows", async (req, res) => {
  try {
    const shows = await Show.find();
    res.json(shows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/shows/:id", async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);
    if (!show) {
      return res.status(400).json({ message: "Movie not found" });
    }
    res.json(show);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/shows", async (req, res) => {
  try {
    const new_show = req.body;
    if (!new_show) {
      console.error("error adding new movie");
      return res.status(400).json({ error: "missing new data" });
    }
    return res.status(200).json(new_show);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.patch("/shows/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updated_show = await Show.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated_show) {
      console.error("error updating movie");
      return res.status(404).json({ error: "cannot update" });
    }

    const fetched_show = await Show.findById(id);

    return res.status(200).json(fetched_show);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "internal server error" });
  }
});

router.delete("/shows/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedShow = await Show.findByIdAndDelete(id);
    if (!deletedShow) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({ message: "Movie deleted successfully", deletedShow });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
