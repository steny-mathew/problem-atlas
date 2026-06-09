const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  text: String,
  source: String,
  category: String,
  author: String,
  createdAt: Date,
});

module.exports = mongoose.model(
  "Complaint",
  complaintSchema
);