const express = require("express");
const cors = require("cors");

const problems = require("./data/problems");

const app = express();

app.use(cors());

app.get("/api/problems", (req, res) => {
  res.json(problems);
});

app.get("/api/atlas", (req, res) => {
  res.json([
    "Missed another internship deadline 😭",
    "No response after applying",
    "Doctor cancelled again",
    "Budgeting feels impossible",
    "Receipts always get lost"
  ]);
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});