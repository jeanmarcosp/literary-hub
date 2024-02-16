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
const { log } = require("console");

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
app.get("/getcollections", async (req, res) => {
  try {
    const { id } = req.query;

    // Find collections by user ID
    const collections = await Collection.find({ user: id });

    // Store the collections in an array
    const collectionsArray = collections.map((collection) =>
      collection.toObject()
    );

    res.status(200).json(collectionsArray);
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({ message: "Could not fetch collections" });
  }
});
//endpoint to add poem to colection
app.post("/addpoemtocollection", async (req, res) => {
  try {
    const { poemId, collectionId } = req.body;

    // Find the collection by its ID
    const collection = await Collection.findById(collectionId);

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    // Check if the poemId is already in the poemsInCollection array
    if (collection.poemsInCollection.includes(poemId)) {
      return res
        .status(400)
        .json({ message: "Poem already in the collection" });
    }

    // If the poem is not in the collection, add it
    collection.poemsInCollection.push(poemId);
    await collection.save();

    res.status(200).json({ message: "Poem added to collection", collection });
  } catch (error) {
    console.error("Error adding poem to collection:", error);
    res.status(500).json({ message: "Could not add poem to collection" });
  }
});

//endpoint to create new collection
app.post("/collection/new", async (req, res) => {
  try {
    const { userId, title } = req.body; // Change 'user' to 'userId'

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const existingCollection = await Collection.findOne({ user: userId, title }); // Change 'user' to 'userId'

    if (existingCollection) {
      return res.status(400).json({ message: "Collection already exists" });
    }

    // create new collection
    const newCollection = new Collection({ user: userId, title }); // Change 'user' to 'userId'

    // Save the new collection to the database
    await newCollection.save();

    await User.updateOne(
      { _id: userId }, // Change '_id' to 'userId'
      { $push: { createdCollections: newCollection._id } }
    );

    res.status(201).json({
      message: "Collection created successfully",
      collection: newCollection,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error creating collection" });
  }
});

// app.post("/collection/new", async (req, res) => {
//   try {
//     const { userId, title } = req.body;
//     if (!title) {
//       return res.status(400).json({ message: "Title is required" });
//     }
//     const existingCollection = await Collection.findOne({ userId, title });
//     if (existingCollection) {
//       return res.status(400).json({ message: "Collection already exists" });
//     }

//     // create new collection
//     const newCollection = new Collection({ user, title });
//     // Save the new collection to the database
//     await newCollection.save();
//     await User.updateOne(
//       { _id: user },
//       { $push: { createdCollections: newCollection._id } }
//     );

//     res.status(201).json({
//       message: "Collection created successfully",
//       collection: newCollection,
//     });
//   } catch (error) {
//     console.log("error", error);
//     res.status(500).json({ message: "Error creatng collecton" });
//   }
// });

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

app.get("/random-poem", async (req, res) => {
  try {
    const randomPoem = await Poem.aggregate([{ $sample: { size: 1 } }]); // Retrieves a random poem from the database
    res.json(randomPoem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching a random poem" });
  }
});

app.get("/get-poems", async (req, res) => {
  try {
    const { skip, limit } = req.query;
    // Query your database for random poems
    const poems = await Poem.aggregate([
      { $sample: { size: parseInt(limit) } },
    ]);
    res.status(200).json(poems);
  } catch (error) {
    res.status(500).json({ message: "Error getting the poems" });
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
      { $pull: { likes: userId } }, // remove user's ID to the likes array
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
  const userId = req.params.userId;

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
app.post("/create-collection", async (req, res) => {
  try {
    const { userId, title, caption, coverArt } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User is a required field" });
    }

    const defaultCaption = "Check out my new collection!";
    const collectionCaption = caption || defaultCaption;

    const defaultTitle = "New Collection";
    const collectionTitle = title || defaultTitle;

    const defaultCoverArt =
      "https://i.pinimg.com/originals/08/90/e2/0890e2a78f1e10a25fbe1e796caf5425.jpg";
    const collectionCoverArt = coverArt || defaultCoverArt;

    const newCollection = new Collection({
      user: userId,
      title: collectionTitle,
      coverArt: collectionCoverArt,
      likes: [],
      poemsInCollection: [],
      caption: collectionCaption,
    });

    const savedCollection = await newCollection.save();

    // Update the user's 'createdCollections' field
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { createdCollections: savedCollection._id } },
      { new: true }
    );

    res.status(201).json(savedCollection); // 201 status code indicates a resource was created
  } catch (error) {
    console.error("Error creating collection:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the collection." });
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
    console.error("Error while getting the profile:", error);
    res.status(500).json({ message: "Error while getting the profile" });
  }
});

//endpoint for returning liked poems, takes in array of poems
app.get("/poems-by-ids", async (req, res) => {
  try {
    const poemIds = req.query.poemIds; // Retrieve poem IDs from the query parameters

    // Fetch poems by their IDs
    const poems = await Poem.find({ _id: { $in: poemIds } });

    if (!poems || poems.length === 0) {
      return res
        .status(404)
        .json({ message: "No poems found for the provided IDs" });
    }

    res.status(200).json(poems);
  } catch (error) {
    console.error("Error while getting poems by IDs:", error);
    res.status(500).json({ message: "Error while getting poems by IDs" });
  }
});

//endpoint for returning collections, takes in array of collections
app.get("/collections-by-ids", async (req, res) => {
  try {
    const collectionIds = req.query.collectionIds; // Retrieve collection IDs from the query parameters

    // Fetch collections by their IDs
    const collections = await Collection.find({ _id: { $in: collectionIds } });

    if (collections.length === 0) {
      return res
        .status(404)
        .json({ message: "No collections found for the provided IDs" });
    }

    res.status(200).json(collections);
  } catch (error) {
    console.error("Error while getting collections by IDs:", error);
    res.status(500).json({ message: "Error while getting collections by IDs" });
  }
});

//endpoint for registering user in the backend
app.post("/register", async (req, res) => {
  try {
    const { name, email, username, password, profilePicture } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    const defaultProfilePicture =
      "https://i.pinimg.com/originals/08/90/e2/0890e2a78f1e10a25fbe1e796caf5425.jpg";
    const userProfilePic = profilePicture || defaultProfilePicture;

    // Create a new user
    const newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      profilePicture: userProfilePic,
      sentFollowRequests: [],
      receivedFollowRequests: [],
      followers: [],
      following: [],
      verified: false,
      likedCollections: [],
      likedCollections: [],
      createdCollections: [],
      readPoems: [],
    });

    // Save the user to the database
    await newUser.save();

    // Include the user ID in the response
    res.status(200).json({
      success: true,
      message: "Registration successful",
      userId: newUser._id,
    });
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

    res
      .status(200)
      .json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ success: false, message: "Error deleting account" });
  }
});

// get the authors with 10+ poems and create collections for each of them
app.get("/create-author-collections", async (req, res) => {
  try {
    // get the authors
    console.log("im in create author collections");
    const authors = await Poem.aggregate([
      {
        $group: {
          _id: "$author",
          poemCount: { $sum: 1 },
        },
      },
    ]);

    for (const author of authors) {
      const userId = author._id;

      // Check if a collection already exists for the author
      const existingCollection = await Collection.findOne({ title: userId });

      if (!existingCollection) {
        // Create a collection for the author

        const newCollection = new Collection({
          title: userId,
          user: "6552982f84f4459fad7d9a7f", // emily's
        });

        // Fetch poems by the author
        const poems = await Poem.find({ author: userId });

        // Add fetched poems to the collection
        newCollection.poemsInCollection = poems.map((poem) => poem._id);

        await newCollection.save();
      }
    }
    res
      .status(200)
      .json({ message: "Author collections created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching trending authors" });
  }
});

// authors that show up on the explore page
app.get("/explore-authors", async (req, res) => {
  try {
    // Query authors with 10 or more poems
    const authors = await Poem.aggregate([
      {
        $group: {
          _id: "$author",
          poemCount: { $sum: 1 },
        },
      },
      {
        $match: {
          poemCount: { $gte: 10 },
        },
      },
      {
        $limit: 6, // Limit the number of authors to 6
      },
    ]);

    const cols = [];

    // Loop through authors and fetch their associated collections
    for (const author of authors) {
      const userId = author._id;

      // Fetch collections for the author
      const col = await Collection.find({ title: userId });

      // Push author and collections to the result array
      cols.push(...col);
    }
    // Extract collections from the collections array
    const extractedCollections = cols.map((col) => ({
      ...col.toObject(),
    }));
    res.json({ extractedCollections });
  } catch (error) {
    console.error("Error fetching trending authors:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching trending authors." });
  }
});

// mark a poem as read
app.put("/mark-poem-as-read/:userId/:poemId", async (req, res) => {
  const { userId, poemId } = req.params;

  try {
    // update the user's readPoems list
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { readPoems: poemId } }, // add poem, avoid duplicates
      { new: true }
    );

    res.status(200).json({ message: "Poem marked as read" });
  } catch (error) {
    console.error("Error marking poem as read:", error);
    res.status(500).json({ message: "Error marking poem as read" });
  }
});

//endpoint to delete a collection
app.delete("/delete-collection", async (req, res) => {
  try {
    const { userId, collectionId } = req.query;

    // Find the collection
    const deletedCollection = await Collection.findById(collectionId);

    if (!deletedCollection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    // Remove the collection from the likedCollections field of all users who liked it
    await User.updateMany(
      { likedCollections: collectionId },
      { $pull: { likedCollections: collectionId } }
    );

    // Remove the collection from the createdCollections field of the user
    await User.findByIdAndUpdate(userId, {
      $pull: { createdCollections: collectionId },
    });

    // Delete the collection from the database
    await Collection.findByIdAndDelete(collectionId);

    res.status(200).json({
      success: true,
      message: "Collection deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting collection:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting collection",
    });
  }
});

//endpoint for getting list of liked poems
app.get("/users/:userId/likedPoems", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const likedPoems = user.likedPoems;

    res.json(likedPoems);
  } catch (error) {
    console.error("Error fetching liked poems:", error);
    res.status(500).send("Internal Server Error");
  }
});

//endpoint for getting list of read poems
app.get("/users/:userId/readPoems", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const readPoems = user.readPoems;

    res.json(readPoems);
  } catch (error) {
    console.error("Error fetching read poems:", error);
    res.status(500).send("Internal Server Error");
  }
});

//endpoint to get follower info
app.get("/get-follower-info", async (req, res) => {
  try {
    const followerIds = req.query.followerIds;

    // Find the users by IDs in your user data (replace this with MongoDB query)
    const followers = await User.find({ _id: { $in: followerIds } });

    if (!followers || followers.length === 0) {
      return res.status(404).json({ error: "Users not found" });
    }

    // Return an array of user details
    const followerDetails = followers.map((follower) => ({
      followerId: follower.id,
      name: follower.name,
      username: follower.username,
      profilePicture: follower.profilePicture,
    }));

    res.status(200).json(followerDetails);
  } catch (error) {
    console.error("Error fetching follower data:", error);
    res.status(500).send("Error fetching follower data");
  }
});

//endpoint to follow a user
app.post("/follow-user", async (req, res) => {
  const { loggedInUser, otherUser } = req.body;
  // console.log("Request Body:", req.body);
  try {
    // Update the selected user's followers list
    await User.findByIdAndUpdate(otherUser, {
      $push: { followers: loggedInUser },
    });

    // Update the current user's following list
    await User.findByIdAndUpdate(loggedInUser, {
      $push: { following: otherUser },
    });

    res.status(200).json({
      success: true,
      message: "User followed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in following a user" });
  }
});

//endpoint to unfollow a user
app.post("/unfollow-user", async (req, res) => {
  const { loggedInUser, otherUser } = req.body;
  // console.log("Request Body:", req.body);
  try {
    // Remove the current user from the selected user's followers list
    await User.findByIdAndUpdate(otherUser, {
      $pull: { followers: loggedInUser },
    });

    // Remove the selected user from the current user's following list
    await User.findByIdAndUpdate(loggedInUser, {
      $pull: { following: otherUser },
    });

    res.status(200).json({
      success: true,
      message: "User unfollowed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in unfollowing a user" });
  }
});

//endpoint for searching
app.get("/search", async (req, res) => {
  console.log("in search");
  try {
    const { query } = req.query;
    console.log("Query is ", query);
    try {
      // const poemResults = await Poem.find({ title: {$regex: query} }).limit(10).sort('author');
      const poemResults = await Poem.aggregate([
        {
          $match: {
            title: { $regex: query, $options: "i" },
          },
        },
        {
          $addFields: {
            likeCount: { $size: "$likes" },
          },
        },
        {
          $sort: { likeCount: -1 },
        },
        {
          $limit: 10,
        },
        {
          $project: {
            likes: 0,
          },
        },
      ]);
      const userResults = await User.aggregate([
        {
          $match: {
            username: { $regex: query, $options: 'i' }
          }
        },
        {
          $sort: { name: -1 }
        },
        {
          $limit: 10
        },
        // {
        //   $project: {
        //     likes: 0
        //   }
        // }
      ]);
      const results = {};
      results['users'] = userResults;
      results['poems'] = poemResults;
      console.log(results);
      res.json(results);
    } catch (error) {
      console.error("Error while getting poem query results ", error);
      res
        .status(500)
        .json({ message: "Error while getting user query results" });
    }
  } catch (error) {
    console.error("Error getting search query ", error);
    res.status(500).json({ message: "Error gettign search query" });
  }
});

app.get("/trending-collections", async (req, res) => {
  try {
    const collections = await Collection.aggregate([
      { $match: { poemsInCollection: { $exists: true, $not: { $size: 0 } } } },
      { $match: { username: { $ne: null } } },
      { $sample: { size: 5 } },
    ]);
    res.json(collections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching trending collections" });
  }
});

//endpoint for commenting
app.post("/comment", async (req, res) => {
  const { userId, poemId, content } = req.body;
  console.log("Received request:", req.body);

  try {
    // Find the poem by ID
    const poem = await Poem.findById(poemId);

    // Create a new comment
    const newComment = {
      user: userId, // Assuming you have user information in the request
      content: content,
      likes: [],
    };

    const updatedPoem = await Poem.findByIdAndUpdate(
      poemId,
      { $addToSet: { comments: newComment } }, // Add user's ID to the likes array
      { new: true } // To return the updated poem
    );

    if (!updatedPoem) {
      return res.status(404).json({ message: "Poem not found" });
    }

    return res.status(201).json({ success: true, comment: newComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Error making comment" });
  }
});

//endpoint for getting single poem info
app.get("/poem/:poemId", async (req, res) => {
  try {
    const poemId = req.params.poemId;

    const poem = await Poem.findById(poemId);

    if (!poem) {
      return res.status(404).json({ message: "Poem not found" });
    }

    res.status(200).json({ poem });
  } catch (error) {
    console.error("Error while getting the poem:", error);
    res.status(500).json({ message: "Error while getting the poem" });
  }
});

//endpoint for liking a comment
app.put("/comments/:commentId/:userId/:poemId/like", async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.params.userId;
  const poemId = req.params.poemId;

  try {
    // Find the poem by its ID
    const poem = await Poem.findById(poemId);

    if (!poem) {
      return res.status(404).json({ message: "Poem not found" });
    }

    // Find the comment by its ID within the poem
    const comment = poem.comments.find((c) => c._id.toString() === commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the user has already liked the comment
    if (comment.likes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User already liked the comment" });
    }

    // Update the comment's likes array
    comment.likes.push(userId);
    await poem.save();

    // Update the user's likedComments array
    await User.findByIdAndUpdate(userId, {
      $addToSet: { likedComments: commentId },
    });

    res.status(200).json({ message: "Comment liked successfully" });
  } catch (error) {
    console.error("Error liking comment:", error);
    res
      .status(500)
      .json({ message: "An error occurred while liking the comment" });
  }
});

//endpoint for unlking a comment
app.put("/comments/:commentId/:userId/:poemId/unlike", async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.params.userId;
  const poemId = req.params.poemId;

  try {
    // Find the poem by its ID
    const poem = await Poem.findById(poemId);

    if (!poem) {
      return res.status(404).json({ message: "Poem not found" });
    }

    // Find the comment by its ID within the poem
    const comment = poem.comments.find((c) => c._id.toString() === commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the user has liked the comment
    if (!comment.likes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User has not liked the comment" });
    }

    // Remove the user from the comment's likes array
    comment.likes.pull(userId);
    await poem.save();

    // Remove the comment from the user's likedComments array
    await User.findByIdAndUpdate(userId, {
      $pull: { likedComments: commentId },
    });

    res.status(200).json({ message: "Comment unliked successfully" });
  } catch (error) {
    console.error("Error unliking comment:", error);
    res
      .status(500)
      .json({ message: "An error occurred while unliking the comment" });
  }
});

app.get('/get-recs/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    console.log("trying to find user");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let recommendedPoems = [];

    for (let poemId of user.likedPoems) {
      let poem = await Poem.findById(poemId);
      for (let otherUserId of poem.likes) {
        if (otherUserId !== userId) {
          let otherUser = await User.findById(otherUserId);
          recommendedPoems = [...recommendedPoems, ...otherUser.likedPoems];
        }
      }
    }

    recommendedPoems = [...new Set(recommendedPoems)]; // Remove duplicates
    recommendedPoems = recommendedPoems.filter(p => !user.readPoems.includes(p)); // Filter out already read poems
    console.log(recommendedPoems);
    const poems = await Poem.find({ _id: { $in: recommendedPoems } });

    console.log(poems);
    res.json(poems);

  } catch (error) {
    res.status(500).json({ error: 'Error fetching recommendations' });
  }
});
