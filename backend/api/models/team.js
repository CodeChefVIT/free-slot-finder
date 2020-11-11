const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  teamName: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Team", teamSchema);
