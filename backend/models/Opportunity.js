const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  title: String,
  body: String,
  url: String,
  source: String,
  subreddit: String,
  upvotes: Number,
  comments: Number,
  category: String,
  summary: String,
  score: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "Opportunity",
  opportunitySchema
);