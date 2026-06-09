const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  title: String,
  url: String,
  source: String,
  subreddit: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "Opportunity",
  opportunitySchema
);