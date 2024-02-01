import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import Like from "./Like";

const Comment = ({ user, text, likeCount, poemId, commentId, handleLikeRefresh }) => {
  const [commenter, setCommenter] = useState({});
  const [liked, setLiked] = useState(false);

//   console.log(handleLikeRefresh);
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${ROOT_URL}/profile/${user}`);
      const commenter = response.data.user;

      setCommenter(commenter);
    } catch (error) {
      console.log("error", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchProfile();
    }, [user])
  );

  const handleLikeComment = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/comments/${commentId}/${user}/${poemId}/like`
      );

      const updatedComment = response.data;

      setLiked(true);
      handleLikeRefresh();
    } catch (error) {
      console.error("Error liking collection:", error);
    }
  };

  const handleUnlikeComment = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/comments/${commentId}/${user}/${poemId}/unlike`
      );

      const updatedComment = response.data;

      setLiked(false);
      handleLikeRefresh();
    } catch (error) {
      console.error("Error liking collection:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{ uri: commenter?.profilePicture }}
          style={styles.userPic}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.username}>@{commenter.username}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.likeContainer}>
        <Like
          inLikes={commenter?.likedComments?.includes(commentId)}
          handleLike={handleLikeComment}
          handleDislike={handleUnlikeComment}
        />
        <Text style={styles.likeNumber}>{likeCount}</Text>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  userPic: {
    width: 40,
    height: 40,
    backgroundColor: "#D9D9D9",
    borderRadius: 100,
    marginLeft: 15,
  },

  text: {
    width: 200,
    lineHeight: 20,
    color: "#373F41",
    fontFamily: "Sarabun-Regular",
    fontSize: 15,
  },

  username: {
    width: 200,
    lineHeight: 20,
    color: "#373F41",
    fontFamily: "Sarabun-Bold",
    fontSize: 15,
  },

  likeContainer: {
    alignItems: "center",
  },

  likeNumber: {
    color: "#373F41",
    fontFamily: "Sarabun-Regular",
    fontSize: 13,
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 100,
  },
});
