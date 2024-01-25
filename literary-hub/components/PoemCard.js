import "react-native-gesture-handler";
import { React, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Like from "./Like";
import axios from "axios";

const PoemCard = ({
  poemId,
  userId,
  title,
  author,
  excerpt,
  likes,
  inLikes,
  handleRefresh,
}) => {
  const likeText = likes === 1 ? "like" : "likes";
  timeEstimate = Math.ceil(excerpt.length / 200);

  const [liked, setLiked] = useState(false);
  const handleLikePoem = async () => {
    try {
      // Send a PUT request to like the poem
      const response = await axios.put(
        `${ROOT_URL}/poems/${poemId}/${userId}/like`
      );

      // If the request is successful, update the state or perform any other action
      const updatedPoem = response.data;

      // Set the liked state to true (or perform any other state update)
      setLiked(true);
      handleRefresh();
    } catch (error) {
      console.error("Error liking poem:", error);
    }
  };

  const handleUnlikePoem = async () => {
    try {
      // Send a PUT request to unlike the poem
      const response = await axios.put(
        `${ROOT_URL}/poems/${poemId}/${userId}/unlike`
      );

      // If the request is successful, update the state or perform any other action
      const updatedPoem = response.data;

      // Set the liked state to false (or perform any other state update)
      setLiked(false);
      handleRefresh();
    } catch (error) {
      console.error("Error unliking poem:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.container}>
        <View style={styles.leftInfo}>
          <View style={styles.mainInfo}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.author}>by {author}</Text>
          </View>
          <Text style={styles.excerpt} numberOfLines={2} ellipsizeMode="tail">
            {excerpt.split("\n").slice(0, 2).join("\n")}
          </Text>
        </View>

        <View style={styles.rightInfo}>
          <View style={styles.poemLengthTag}>
            <Text style={styles.poemLengthText}>{timeEstimate} min</Text>
          </View>

          <View style={styles.likes}>
            <Like
              inLikes={inLikes}
              handleLike={handleLikePoem}
              handleDislike={handleUnlikePoem}
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
  card: {
    overflow: "visible",
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingHorizontal: 18,
    paddingVertical: 18,
    backgroundColor: "white",
    borderRadius: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    overflow: "visible",
  },

  leftInfo: {
    flexDirection: "column",
    width: "80%",
  },

  mainInfo: {
    rowGap: 2,
  },

  title: {
    fontFamily: "Sarabun-Bold",
    fontSize: 18,
    color: "#373F41",
  },

  author: {
    fontFamily: "Sarabun-Regular",
    fontSize: 15,
    color: "grey",
  },

  excerpt: {
    fontFamily: "Sarabun-Regular",
    fontSize: 14,
    color: "#373F41",
    marginTop: 10,
  },

  rightInfo: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  poemLengthTag: {
    borderWidth: 1,
    borderColor: "#D6CEDF",
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "#F9F3FF",
  },

  poemLengthText: {
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

export default PoemCard;
