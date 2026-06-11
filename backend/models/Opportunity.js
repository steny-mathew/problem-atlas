const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  title: String,
  body: String,
  url: String,
  source: String,
  subreddit: String,

  isOpportunity: Boolean,

  category: String,

  summary: String,

  demand: Number,

  difficulty: Number,

  businessPotential: Number,

  opportunityScore: Number,

  reasoning: String,

  aiProcessed: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "Opportunity",
  opportunitySchema
);