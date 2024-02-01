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
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import Follower from "../components/Follower.js";
import axios from "axios";

const FollowingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { followingList, loggedInUser } = route.params;

  const [followingInfo, setFollowingInfo] = useState([]);
  // console.log("here", loggedInUser);

  useFocusEffect(
    React.useCallback(() => {
      const fetchFollowing = async () => {
        try {
          const response = await axios.get(
            `${ROOT_URL}/get-follower-info`,
            {
              params: {
                followerIds: followingList,
              },
            }
          );
          const followingDetails = response.data;
          setFollowingInfo(followingDetails);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.log("No followings found");
            setFollowingInfo([]);
          } else {
            console.error("Error fetching followings:", error);
          }
        }
      };

      fetchFollowing();
    }, [followingList])
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={22} color="#373F41" />
          </TouchableOpacity>

          <Text style={styles.title}>{followingInfo?.length} Following</Text>
          <Ionicons name="chevron-back-outline" size={22} color="#fff" />
        </View>

        <FlatList
          data={followingInfo}
          renderItem={({ item }) => (
            <Follower
              key={item._id}
              loggedInUser={loggedInUser}
              otherUser={item.followerId}
              name={item.name}
              username={item.username}
              profilePicture={item.profilePicture}
              status={true}
            />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    </SafeAreaView>
  );
};

export default FollowingScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 25,
  },

  title: {
    fontFamily: "HammersmithOne",
    fontSize: 18,
  },

  list: {
    marginTop: 20,
  },
});
