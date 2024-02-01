const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  joinDate: { type: Date, default: Date.now },
  sentFollowRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  receivedFollowRequests: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  likedPoems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Poem" }],
  likedCollections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
  likedComments: [{ type: mongoose.Schema.Types.ObjectId }],
  createdCollections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
  readPoems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Poem" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
