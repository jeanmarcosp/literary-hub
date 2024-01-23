const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");

const User = require("./models/user");
const Poem = require("./models/poem");
const Collection = require("./models/collection");

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

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};
const secretKey = generateSecretKey();

// endpoint for login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Email received:", email);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email" });
    }
    if (user.password != password) {
      return res.status(404).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.log("error", error);
  }
});
//endpoint to get list of user collections
app.get('/getcollections', async (req, res) => {
  try {
    const { id } = req.query;

    // Find collections by user ID
    const collections = await Collection.find({ user: id });

    // Store the collections in an array
    const collectionsArray = collections.map((collection) => collection.toObject());

    res.status(200).json(collectionsArray);
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({ message: "Could not fetch collections" });
  }
});
//endpoint to add poem to colection
app.post('/addpoemtocollection', async (req, res) => {
  try {
    const { poemId, collectionId } = req.body;

    // Find the collection by its ID
    const collection = await Collection.findById(collectionId);

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    // Check if the poemId is already in the poemsInCollection array
    if (collection.poemsInCollection.includes(poemId)) {
      return res.status(400).json({ message: 'Poem already in the collection' });
    }

    // If the poem is not in the collection, add it
    collection.poemsInCollection.push(poemId);
    await collection.save();

    res.status(200).json({ message: 'Poem added to collection', collection });
  } catch (error) {
    console.error('Error adding poem to collection:', error);
    res.status(500).json({ message: 'Could not add poem to collection' });
  }
});


//endpoint to create new collection
app.post("/collection/new", async (req, res) => {
  try {
    const { user, title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const existingCollection = await Collection.findOne({ user, title });
    if (existingCollection) {
      return res.status(400).json({ message: "Collection already exists" })
    }

    // create new collection
    const newCollection = new Collection({ user, title });
    // Save the new collection to the database
    await newCollection.save();
    await User.updateOne(
      {_id: user},
      {$push: {createdCollections: newCollection._id}}
    );

    res.status(201).json({ message: "Collection created successfully", collection: newCollection });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error creatng collecton" });
  }
});

// endpoint to get userdata
app.get("/getuser", async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Can't find user" });
    }
    res.json(user);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get('/random-poem', async (req, res) => {
  try {
    const randomPoem = await Poem.aggregate([{ $sample: { size: 1 } }]); // Retrieves a random poem from the database
    res.json(randomPoem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching a random poem' });
  }
});


app.get('/get-poems', async (req, res) => {
  try {
    const { skip, limit } = req.query;
    // Query your database for random poems
    // Example using Mongoose:
    const poems = await Poem.aggregate([
      { $sample: { size: parseInt(limit) } }
    ]);
    res.status(200).json(poems);
  } catch (error) {
    res.status(500).json({ message: 'Error getting the poems' });
  }
});

//endpoint for liking a single poem, updates poems likes array and also adds poem to users likedPoems array
app.put("/poems/:poemId/:userId/like", async (req, res) => {
  const poemId = req.params.poemId;
  const userId = req.params.userId; // Assuming you have a way to get the logged-in user's ID

  try {
    const poem = await Poem.findById(poemId);

    const updatedPoem = await Poem.findByIdAndUpdate(
      poemId,
      { $addToSet: { likes: userId } }, // Add user's ID to the likes array
      { new: true } // To return the updated poem
    );

    if (!updatedPoem) {
      return res.status(404).json({ message: "Poem not found" });
    }

    res.json(updatedPoem);
  } catch (error) {
    console.error("Error liking poem:", error);
    res
      .status(500)
      .json({ message: "An error occurred while liking the poem" });
  }

  try {
    await User.findByIdAndUpdate(userId, { $addToSet: { likedPoems: poemId } });
  } catch (error) {
    console.error("Error adding poem to user's liked poems:", error);
  }
});

//endpoint for unliking a single poem
app.put("/poems/:poemId/:userId/unlike", async (req, res) => {
  const poemId = req.params.poemId;
  const userId = req.params.userId; // Assuming you have a way to get the logged-in user's ID

  try {
    const poem = await Poem.findById(poemId);

    const updatedPoem = await Poem.findByIdAndUpdate(
      poemId,
      { $pull: { likes: userId } }, // Add user's ID to the likes array
      { new: true } // To return the updated poem
    );

    if (!updatedPoem) {
      return res.status(404).json({ message: "Poem not found" });
    }

    res.json(updatedPoem);
  } catch (error) {
    console.error("Error unliking poem:", error);
    res
      .status(500)
      .json({ message: "An error occurred while unliking the poem" });
  }

  try {
    await User.findByIdAndUpdate(userId, { $pull: { likedPoems: poemId } });
  } catch (error) {
    console.error("Error removing poem from user's liked poems:", error);
  }
});

//endpoint for liking a collection, updates collection's likes array and also adds collection to users likedCollections array
app.put("/collections/:collectionId/:userId/like", async (req, res) => {
  const collectionId = req.params.collectionId;
  const userId = req.params.userId; // Assuming you have a way to get the logged-in user's ID

  try {
    const collection = await Collection.findById(collectionId);

    const updatedCollection = await Collection.findByIdAndUpdate(
      collectionId,
      { $addToSet: { likes: userId } }, // Add user's ID to the likes array
      { new: true } // To return the updated post
    );

    if (!updatedCollection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.json(updatedCollection);
  } catch (error) {
    console.error("Error liking collection:", error);
    res
      .status(500)
      .json({ message: "An error occurred while liking the collection" });
  }

  try {
    await User.findByIdAndUpdate(userId, {
      $addToSet: { likedCollections: collectionId },
    });
  } catch (error) {
    console.error(
      "Error adding collection to user's liked collections:",
      error
    );
  }
});

//endpoint for unliking a collection
app.put("/collections/:collectionId/:userId/unlike", async (req, res) => {
  const collectionId = req.params.collectionId;
  const userId = req.params.userId; // Assuming you have a way to get the logged-in user's ID

  try {
    const collection = await Collection.findById(collectionId);

    const updatedCollection = await Collection.findByIdAndUpdate(
      collectionId,
      { $pull: { likes: userId } }, // Add user's ID to the likes array
      { new: true } // To return the updated post
    );

    if (!updatedCollection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.json(updatedCollection);
  } catch (error) {
    console.error("Error unliking collection:", error);
    res
      .status(500)
      .json({ message: "An error occurred while unliking the collection" });
  }

  try {
    await User.findByIdAndUpdate(userId, {
      $pull: { likedCollections: collectionId },
    });
  } catch (error) {
    console.error(
      "Error removing collection from user's liked collections:",
      error
    );
  }
});

//endpoint for creating a collection
app.post('/create-collection', async (req, res) => {
  try {
    const { userId, title, caption, coverArt } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User is a required field' });
    }
    
    const defaultCaption = 'Check out my new collection!';
    const collectionCaption = caption || defaultCaption;

    defaultTitle = 'New Collection';
    const collectionTitle = title || defaultTitle;

    const newCollection = new Collection({
      user: userId,
      title: collectionTitle,
      coverArt: coverArt,
      likes: [],
      poemsInCollection: [],
      caption: collectionCaption,
    });

    const savedCollection = await newCollection.save();

    // Update the user's 'createdCollections' field
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { createdCollections: savedCollection._id } },
      { new: true } // To return the updated user document
    );

    res.status(201).json(savedCollection); // 201 status code indicates a resource was created

  } catch (error) {
    console.error('Error creating collection:', error);
    res.status(500).json({ error: 'An error occurred while creating the collection.' });
  }
});

//endpoint for getting logged in user info
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error while getting the profile:', error);
    res.status(500).json({ message: "Error while getting the profile" });
  }
});

//endpoint for returning liked poems, takes in array of poems
app.get('/poems-by-ids', async (req, res) => {
  try {
    const poemIds = req.query.poemIds; // Retrieve poem IDs from the query parameters

    // Fetch poems by their IDs
    const poems = await Poem.find({ _id: { $in: poemIds } });

    if (!poems || poems.length === 0) {
      return res.status(404).json({ message: "No poems found for the provided IDs" });
    }

    res.status(200).json(poems);
  } catch (error) {
    console.error('Error while getting poems by IDs:', error);
    res.status(500).json({ message: "Error while getting poems by IDs" });
  }
});

//endpoint for returning collections, takes in array of collections
app.get('/collections-by-ids', async (req, res) => {
  try {
    const collectionIds = req.query.collectionIds; // Retrieve collection IDs from the query parameters

    // Fetch collections by their IDs
    const collections = await Collection.find({ _id: { $in: collectionIds } });

    if (collections.length === 0) {
      return res.status(404).json({ message: "No collections found for the provided IDs" });
    }

    res.status(200).json(collections);
  } catch (error) {
    console.error('Error while getting collections by IDs:', error);
    res.status(500).json({ message: "Error while getting collections by IDs" });
  }
});

//endpoint for registering user in the backend
app.post("/register", async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // Create a new user
    const newUser = new User({ name, email, username, password });

    // Save the user to the database
    await newUser.save();

    // Include the user ID in the response
    res.status(200).json({ success: true, message: "Registration successful", userId: newUser._id });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Error registering user" });
  }
});

// endpoint for deleting a user 
app.delete("/delete-account/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Delete the user account from the database
    await User.findByIdAndDelete(userId);

    res.status(200).json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ success: false, message: "Error deleting account" });
  }
});


app.get('/author-collection', async (req, res) => {
  const author = req.query.author;

  try{
    let query = {};
    if (author) {
      query.author = author;
    }

    const poems = await Poem.find(query).sort('author');
    console.log(poems);
    res.json(poems);

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error populating author collections' });
  }
});

app.get('/trending-authors', async (req, res) => {

  try{
    const authors = await Poem.aggregate([
      {
        $group: {
          _id: '$author',
          poemCount: { $sum: 1 }
        }
      },
      {
        $match: {
          poemCount: { $gte: 10 }
        }
      },
      {
        $sample: { size: 6 }
      }
    ]);
    res.json(authors);
    console.log(authors);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching trending authors' });
  }
});


// mark a poem as read
app.put('/mark-poem-as-read/:userId/:poemId', async (req, res) => {
  const { userId, poemId } = req.params;

  try {
    // update the user's readPoems list
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { readPoems: poemId } }, // add poem, avoid duplicates
      { new: true }
    );

    res.status(200).json({ message: 'Poem marked as read' });
  } catch (error) {
    console.error('Error marking poem as read:', error);
    res.status(500).json({ message: 'Error marking poem as read' });
  }
});
