import "react-native-gesture-handler";
import { React, useState } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import Like from "./Like";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const CollectionCard = ({
  collectionId,
  userId,
  coverImage,
  title,
  caption,
  creator,
  size,
  likes,
  inLikes,
}) => {
  const navigation = useNavigation();
  const poemText = size === 1 ? "poem" : "poems";
  const likeText = likes === 1 ? "like" : "likes";

  const [liked, setLiked] = useState(false);


  const fetchUsername = async(userId) => {
    try {
      const userResponse = await axios.get(`http://your-server-url/api/users/${userId}`);
      return userResponse.data.name;
    } catch (error) {
      console.error(error);
      return 'Unknown User';
    }
  };

  const handleLikeCollection = async () => {
    try {
      const response = await axios.put(
        `${ROOT_URL}/collections/${collectionId}/${userId}/like`
      );

      // If the request is successful, update the state or perform any other action
      const updatedCollection = response.data;

      // Set the liked state to true (or perform any other state update)
      setLiked(true);
    } catch (error) {
      console.error("Error liking collection:", error);
      // Handle errors or perform any other action
    }
  };

  const handleUnlikeCollection = async () => {
    try {
      const response = await axios.put(
        `${ROOT_URL}/collections/${collectionId}/${userId}/unlike`
      );

      // If the request is successful, update the state or perform any other action
      const updatedCollection = response.data;

      // Set the liked state to false (or perform any other state update)
      setLiked(false);
    } catch (error) {
      console.error("Error unliking collection:", error);
      // Handle errors or perform any other action
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("CollectionScreen")}
    >
      <View style={styles.container}>
        <View style={styles.info}>
          <Image
            source={{
              uri: coverImage,
            }}
            style={styles.image}
          />
          <View style={styles.text}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.creator}>@{creator}</Text>
            </View>
            <Text style={styles.caption}>{caption}</Text>
          </View>
        </View>

        <View style={styles.rightInfo}>
          <View style={styles.poemNumberTag}>
            <Text style={styles.poemNumberText}>
              {size} {poemText}
            </Text>
          </View>

          <View style={styles.likes}>
            <Like
              inLikes={inLikes}
              handleLike={handleLikeCollection}
              handleDislike={handleUnlikeCollection}
            />
            <Text style={styles.likeNumber}>
              {likes} {likeText}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },

  container: {
    paddingHorizontal: 13,
    paddingVertical: 15,
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    flexDirection: "row",
    marginBottom: 15,
  },

  info: {
    flexDirection: "row",
    columnGap: 15,
    alignItems: "center",
  },

  text: {
    flexDirection: "column",
    justifyContent: "space-between",
  },

  title: {
    fontFamily: "HammersmithOne",
    fontSize: 18,
    color: "#373F41",
  },

  creator: {
    fontFamily: "Sarabun-Regular",
    fontSize: 16,
    color: "gray",
  },

  caption: {
    fontFamily: "Sarabun-Regular",
    fontSize: 15,
    color: "#373F41",
    width: 150,
  },

  rightInfo: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  poemNumberTag: {
    borderWidth: 1,
    borderColor: "#D6CEDF",
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "#F9F3FF",
  },

  poemNumberText: {
    fontFamily: "Sarabun-SemiBold",
    color: "#774BA3",
  },

  likes: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 3,
  },

  likeNumber: {
    fontFamily: "Sarabun-SemiBold",
    color: "#774BA3",
  },
});

export default CollectionCard;
