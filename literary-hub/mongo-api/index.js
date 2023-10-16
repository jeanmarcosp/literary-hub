
// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const crypto = require("crypto");
// const nodemailer = require("nodemailer");
// const axios = require('axios');

// const app = express();
// const port = 3000;
// const cors = require("cors");
// app.use(cors());

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// const jwt = require("jsonwebtoken");

// mongoose
//   .connect(
//     "mongodb+srv://literaryhub:literaryhub23F@cluster0.dgte4wo.mongodb.net/",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.log(err);
//     console.log("Error Connecting to MongoDB");
//   });

// app.listen(port, () => {
//   console.log("Server running on port 3000");
// });

// //below blocks from chatgpt as scaffold

// // a MongoDB model for your data
// const Entry = mongoose.model('Entry', {
//   author: String,  
//   title: String,
//   poemText: String,  
// });

// // an endpoint to populate your database
// app.get('/populate', async (req, res) => {
//   try {
//     // populate your MongoDB database with poems
//     await fetchDataFromPoetryDB();

//     res.status(200).json({ message: 'Data inserted into the database' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error populating the database' });
//   }
// });

// const fetchDataFromPoetryDB = async () => {
//   try {
//     // get all authors
//     const authorsResponse = await axios.get('https://poetrydb.org/author');
//     const authors = authorsResponse.data.authors;

//     // get all poems for each author
//     for (const author of authors) {
//       const poemsResponse = await axios.get(`https://poetrydb.org/author/${author}`);
//       const poems = poemsResponse.data;

//       // put into database
//       for (const poem of poems) {
//         const title = poem.title;
//         const poemText = poem.lines.join('\n');
//         await Entry.create({ author, title, poemText });
//       }
//     }

//     console.log('Data inserted into the database.');
//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//     mongoose.disconnect();
//   }
// };




// //run `yarn start` and check database to see if it worked
// //we might need to destructure code so we are not repopulating the db everytime
// //we run the app


const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const axios = require('axios');

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");

mongoose
  .connect(
    "mongodb+srv://literaryhub:literaryhub23F@cluster0.dgte4wo.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
    console.log("Error Connecting to MongoDB");
  });

app.listen(port, () => {
  console.log("Server running on port 3000");
});



//run `yarn start` and check database to see if it worked
//we might need to destructure code so we are not repopulating the db everytime
//we run the app