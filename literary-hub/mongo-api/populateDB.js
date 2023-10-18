
const mongoose = require("mongoose");
const axios = require("axios");
const Poem = require("./models/poem"); // Import your Mongoose Poem model

async function fetchDataFromAPI() {
  try {
    // Get all authors
    const authorsResponse = await axios.get('https://poetrydb.org/author');
    const authors = authorsResponse.data.authors;

    // Get all poems for each author
    for (const author of authors) {
      const poemsResponse = await axios.get(`https://poetrydb.org/author/${author}`);
      const poems = poemsResponse.data;

      // Put data into the database
      for (const poem of poems) {
        const title = poem.title;
        const poemText = poem.lines.join('\n');
        const lineCount = poem.linecount;
        await Poem.create({ author, title, content: poemText, lineCount}); // Use Poem model

      }
    }

    console.log('Data inserted into the database.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

mongoose.connect('mongodb+srv://literaryhub:literaryhub23F@cluster0.dgte4wo.mongodb.net/', { useNewUrlParser: true });

mongoose.connection.on('connected', async () => {
  console.log('Connected to the database');
  await fetchDataFromAPI(); // Populate the database
});
