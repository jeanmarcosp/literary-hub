// TO DO: ADD TO SCRIPT

const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');



const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");

console.log("about to run")
//below blocks from chatgpt as scaffold

axios
    .get("http://localhost:3000/populate")
    .catch((error) => {
        console.log("error fetching poem", error);
    });

// an endpoint to populate your database
app.get('/populate', async (req, res) => {
    try {
        // populate your MongoDB database with poems
        console.log("about to fetch poems")
        await fetchDataFromPoetryDB();

        res.status(200).json({ message: 'Data inserted into the database' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error populating the database' });
    }
});

const Poem = require("./models/poem");

const fetchDataFromPoetryDB = async () => {
    try {

        // get all authors
        const authorsResponse = await axios.get('https://poetrydb.org/author');
        const authors = authorsResponse.data.authors;
        console.log("got authors")

        // get all poems for each author
        for (const author of authors) {
            const poemsResponse = await axios.get(`https://poetrydb.org/author/${author}`);
            const poems = poemsResponse.data;

            // put into database
            for (const poem of poems) {
                const title = poem.title;
                const poemText = poem.lines.join('\n');
                const numLines = poem.linecount;

                const newPoem = new Poem({ author, title, poemText, numLines });

                await newPoem.save();

                //await Entry.create({ author, title, poemText });
            }
        }

        console.log('Data inserted into the database.');
    } catch (error) {
        console.error('Error:', error);
    } 
};



