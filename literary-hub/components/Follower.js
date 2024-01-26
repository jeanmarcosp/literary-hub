import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Follower = ({
  loggedInUser,
  otherUser,
  name,
  username,
  profilePicture,
  status,
}) => {
  const [isFollowing, setIsFollowing] = useState(status);
  console.log(status);

  const handlePress = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
    setIsFollowing(!isFollowing);
  };

  const handleFollow = async () => {
    try {
      await axios.post(`${ROOT_URL}/follow-user`, {
        loggedInUser: loggedInUser,
        otherUser: otherUser,
      });

      setIsFollowing(true);
      console.log("Successfully followed user");
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.post(`${ROOT_URL}/unfollow-user`, {
        loggedInUser: loggedInUser,
        otherUser: otherUser,
      });

      setIsFollowing(false);
      console.log("Successfully unfollowed user");
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  return (
    <View style={styles.profile}>
      <View style={styles.profileInfo}>
        <Image
          source={{
            uri: profilePicture,
          }}
          style={styles.profilePic}
        />
        <View style={styles.text}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={handlePress}>
        {isFollowing ? (
          <View style={styles.unfollowButton}>
            <Text style={styles.unfollowButtonText}>Unfollow</Text>
          </View>
        ) : (
          <View style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Follower;

const styles = StyleSheet.create({
  profile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },

  profilePic: {
    backgroundColor: "#000",
    width: 55,
    height: 55,
    borderRadius: 100,
  },

  text: {
    rowGap: 3,
  },

  username: {
    fontFamily: "Sarabun-SemiBold",
    fontSize: 18,
  },

  name: {
    fontFamily: "Sarabun-Regular",
    fontSize: 16,
  },

  unfollowButton: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },

  unfollowButtonText: {
    fontFamily: "Sarabun-SemiBold",
    fontSize: 16,
    color: "#644980",
  },

  followButton: {
    backgroundColor: "#644980",
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },

  followButtonText: {
    fontFamily: "Sarabun-SemiBold",
    fontSize: 16,
    color: "white",
  },
});
