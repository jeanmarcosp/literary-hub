const mongoose = require("mongoose");

const dailyPoemSchema = new mongoose.Schema({
  _id: Date,
  poemId: { type: mongoose.Schema.Types.ObjectId }
});

const DailyPoem = mongoose.model("DailyPoem", dailyPoemSchema);

module.exports = DailyPoem;
