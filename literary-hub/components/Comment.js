import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import Like from "./Like";
import { Ionicons } from "@expo/vector-icons";
import getUserId from "../hooks/getUserId";

const Comment = ({
  user,
  text,
  likeCount,
  poemId,
  commentId,
  handleLikeRefresh,
}) => {
  const [commenter, setCommenter] = useState({});
  const [liked, setLiked] = useState(false);
  const userId = getUserId();

  console.log(user);
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
        `${ROOT_URL}/comments/${commentId}/${user}/${poemId}/like`
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
        `${ROOT_URL}/comments/${commentId}/${user}/${poemId}/unlike`
      );

      const updatedComment = response.data;

      setLiked(false);
      handleLikeRefresh();
    } catch (error) {
      console.error("Error liking collection:", error);
    }
  };

  const handleDeleteComment = async () => {
    try {
      const commentDetails = {
        userId: user,
        poemId: poemId,
        commentId: commentId,
      };
      console.log(commentDetails);

      const response = await axios.delete(`http://localhost:3000/delete-comment`, { data: commentDetails });

      console.log("Deleted Comment successfully", response);
      handleLikeRefresh();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.commenterInfo}>
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
      </View>

      <View style={styles.commentAction}>
        {userId === user && (
          <Ionicons
            name="trash-outline"
            size={24}
            color="red"
            onPress={handleDeleteComment}
          />
        )}
        <View style={styles.likeContainer}>
          <Like
            inLikes={commenter?.likedComments?.includes(commentId)}
            handleLike={handleLikeComment}
            handleDislike={handleUnlikeComment}
          />
          <Text style={styles.likeNumber}>{likeCount}</Text>
        </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  commenterInfo: {
    flexDirection: 'row',
    columnGap: 10,
  },

  userPic: {
    width: 40,
    height: 40,
    backgroundColor: "#D9D9D9",
    borderRadius: 100,
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

  commentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
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
  },
});
