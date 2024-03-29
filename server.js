const express = require("express");
const mongoose = require("mongoose");
const MovieRoutes = require("./routes/movie.js");
const ShowRoutes = require("./routes/show.js");
const UserRoutes = require("./routes/auth.js");

const PORT = 4000;

const app = express();

app.use(express.json());

app.use("/api", UserRoutes);
app.use("/api", MovieRoutes);
app.use("/api", ShowRoutes);

mongoose
  .connect("mongodb://localhost:27017/MovieApi", {
    useNewUrlParser: true, // Update if using Mongoose >= 6.0.0
    useUnifiedTopology: true, // Update if using Mongoose >= 6.0.0
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Could not connect to database:", error);
  });

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
