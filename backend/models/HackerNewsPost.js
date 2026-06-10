const mongoose = require("mongoose");

const hackerNewsSchema =
  new mongoose.Schema({
    title: String,
    url: String,
    score: Number,
    by: String,
    time: Number,
  });

module.exports = mongoose.model(
  "HackerNewsPost",
  hackerNewsSchema
);