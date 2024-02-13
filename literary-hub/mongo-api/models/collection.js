const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  coverArt: { type: String },
  createDate: { type: Date, default: Date.now },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  poemsInCollection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poem",
    },
  ],
  caption: { type: String },
});

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;
