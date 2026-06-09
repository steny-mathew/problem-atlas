const Opportunity = require("./models/Opportunity");
const fetchHackerNewsPosts =
  require("./collectors/hackerNewsCollector");
const Problem = require("./models/Problem");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const problems = require("./data/problems");

const app = express();

app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

  app.get("/api/problems", async (req, res) => {
    try {
      const problems = await Problem.find();
  
      res.json(problems);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });
  app.get("/api/opportunities", async (req, res) => {
    try {
      const opportunities =
        await Opportunity.find();
  
      res.json(opportunities);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });
app.get("/seed", async (req, res) => {
  await Problem.deleteMany({});

  await Problem.insertMany(problems);

  res.send("Database Seeded!");
});
app.get(
  "/api/hackernews",
  async (req, res) => {
    try {
      const posts =
        await fetchHackerNewsPosts();

      res.json(posts);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);
app.listen(3001, () => {
  console.log("Server running on port 3001");
});