const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: String,
  category: String,
  mentions: Number,
  growth: Number,
  score: Number,
  complaints: [String],
});

module.exports = mongoose.model(
  "Problem",
  problemSchema
);