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
import Follower from "../components/Follower";
import axios from "axios";

const FollowersScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { followerList, loggedInUser, followingList } = route.params;
  console.log()

  const [followerInfo, setFollowerInfo] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchFollowers = async () => {
        try {
          const response = await axios.get(
            `${ROOT_URL}/get-follower-info`,
            {
              params: {
                followerIds: followerList,
              },
            }
          );
          const followerDetails = response.data;
          setFollowerInfo(followerDetails);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.log("No followers found");
            setFollowerInfo([]);
          } else {
            console.error("Error fetching followers:", error);
          }
        }
      };

      fetchFollowers();
    }, [followerList])
  );

  // console.log(followerInfo);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={22} color="#373F41" />
          </TouchableOpacity>

          <Text style={styles.title}>{followerInfo?.length} Follower</Text>
          <Ionicons name="chevron-back-outline" size={22} color="white" />
        </View>

        <FlatList
          data={followerInfo}
          renderItem={({ item }) => (
            <Follower
              key={item._id}
              loggedInUser={loggedInUser}
              otherUser={item.followerId}
              name={item.name}
              username={item.username}
              profilePicture={item.profilePicture}
              status={followingList.includes(item.followerId)}
            />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    </SafeAreaView>
  );
};

export default FollowersScreen;

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
