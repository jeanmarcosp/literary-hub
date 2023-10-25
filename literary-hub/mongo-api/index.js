const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const axios = require("axios");

const app = express();
const port = 3000;
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
      res.status(200).json({ token });



  } catch (error) {
      console.log("error", error);
  }
});
//endpoint to get all the poems in database, use this endpoint to populate homepage
app.get("/get-poems", async (req, res) => {
  try {
    const poems = await Poem.aggregate([
      { $sample: { size: Poem.countDocuments() } },
    ]);
    res.status(200).json(poems);
  } catch (error) {
    res.status(500).json({ message: "error getting the poems" });
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
