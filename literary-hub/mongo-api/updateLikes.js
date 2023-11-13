const mongoose = require('mongoose');
const Poem = require("./models/poem");

async function updateLikes() {
  try {
    const poems = await Poem.find();

    for (const poem of poems) {
      // Update the poem with an empty array for "likes"
      await Poem.findByIdAndUpdate(poem._id, { likes: [] });
    }

    console.log('Likes updated successfully');
  } catch (error) {
    console.error('Error updating likes:', error);
  }
}

// Connect to the MongoDB database
mongoose.connect('mongodb+srv://literaryhub:literaryhub23F@cluster0.dgte4wo.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// Run the updateLikes function
updateLikes();
