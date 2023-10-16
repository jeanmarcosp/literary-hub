const mongoose = require("mongoose");

const poemSchema = new mongoose.Schema ({
     
    author: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    lineCount: { type: String },
    likes: { type: Number, default: 0 },
    comments: [
        {
        //   user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User",
        //   },
          content: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    
});


const Poem = mongoose.model("Poem", poemSchema);

module.exports = Poem;