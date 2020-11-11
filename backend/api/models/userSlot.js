const mongoose = require("mongoose");

const userSlotSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  memberName: { type: String },
  timetable: { type: Object },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
});

module.exports = mongoose.model("userSlot", userSlotSchema);
