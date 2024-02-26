const mongoose = require("mongoose");

const ShowSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Genre: {
    type: String,
    required: true,
  },
  ReleaseYear: {
    type: Number,
    required: true,
  },
  Cast: [
    {
      actorName: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
    },
  ],
  Crew: [
    {
      crewMemberName: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
    },
  ],
  Ratings: [
    {
      source: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
    },
  ],
  Reviews: [
    {
      reviewer: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
    },
  ],
  Trailers: [
    {
      url: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
  ],
  StreamingAvailability: [
    {
      platform: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
    },
  ],
});

const Show = mongoose.model("Show", ShowSchema);

module.exports = Show;
