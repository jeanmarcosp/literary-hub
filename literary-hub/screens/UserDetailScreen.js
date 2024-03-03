import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import getUserId from "../hooks/getUserId";
import PoemCard from "../components/PoemCard";
import CollectionCard from "../components/CollectionCard";


const UserDetailScreen = ({ route }) => {
  const userId = getUserId();
  const [otherUser, setOtherUser] = useState({});
  const [poems, setPoems] = useState([]);
  const [collections, setCollections] = useState([]);
  const [likedCollections, setLikedCollections] = useState([]);
  const [segmentedControlView, setSegmentedControlView] =
    useState("Collections");
  const navigation = useNavigation();
  const { otherUserId, isFollowing, callbacks } = route.params;
  const [following, setFollowing] = useState(isFollowing);

  const handlePoemPress = (poem) => {
    console.log("pressed poem card");
    //console.log("this is where we are");
    navigation.navigate('SinglePoem', { poem, poemId, userLikedPoems, fromHome:false, collection });
    };

  const handlePress = () => {
    if (callbacks && callbacks.handleFollow && following) {
      callbacks.handleUnfollow();
    }
    if (callbacks && callbacks.handleUnfollow) {
      callbacks.handleFollow();
    }
    setFollowing(!following);
    fetchOtherProfile();
  };

  // this gets the users information stored in user?.
  const fetchOtherProfile = async () => {
    try {
      const response = await axios.get(`${ROOT_URL}/profile/${otherUserId}`);
      const user = response.data.user;

      setOtherUser(user);
    } catch (error) {
      console.log("error", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchOtherProfile();
    }, [otherUserId])
  );

  // console.log(otherUser.name);

  // fetch poems
  useEffect(() => {
    const fetchLikedPoems = async () => {
      try {
        const poemIdsToFetch = otherUser?.likedPoems;

        // Check if poemIdsToFetch is truthy before making the API call
        if (poemIdsToFetch) {
          const response = await axios.get(`${ROOT_URL}/poems-by-ids`, {
            params: {
              poemIds: poemIdsToFetch,
            },
          });

          const fetchedPoems = response.data;
          setPoems(fetchedPoems);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("No liked poems found");
          setPoems([]);
        } else {
          console.error("Error fetching poems:", error);
        }
      }
    };

    fetchLikedPoems();
  }, [otherUser]);

  // fetch created collections
  useEffect(() => {
    // Fetch collections based on user's createdCollections
    const fetchCreatedCollections = async () => {
      try {
        const collectionIdsToFetch = otherUser?.createdCollections;

        // Check if collectionIdsToFetch is truthy before making the API call
        if (collectionIdsToFetch) {
          const response = await axios.get(`${ROOT_URL}/collections-by-ids`, {
            params: {
              collectionIds: collectionIdsToFetch,
            },
          });

          const fetchedCollections = response.data;
          // console.log("collections render");
          setCollections(fetchedCollections);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("No created collections found");
          setCollections([]);
        } else {
          console.error("Error fetching collections:", error);
        }
      }
    };

    fetchCreatedCollections();
  }, [otherUser]);

  // fetch liked collections
  useEffect(() => {
    // Fetch collections based on user's createdCollections
    const fetchLikedCollections = async () => {
      try {
        const collectionIdsToFetch = otherUser?.likedCollections;

        // Check if collectionIdsToFetch is truthy before making the API call
        if (collectionIdsToFetch) {
          const response = await axios.get(`${ROOT_URL}/collections-by-ids`, {
            params: {
              collectionIds: collectionIdsToFetch,
            },
          });

          const fetchedLikedCollections = response.data;
          // console.log("collections render");
          setLikedCollections(fetchedLikedCollections);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("No liked collections found");
          setLikedCollections([]);
        } else {
          console.error("Error fetching liked collections:", error);
        }
      }
    };

    fetchLikedCollections();
  }, [otherUser]);

  const CollectionsView = ({ collections }) => {
    return (
      <FlatList
        data={collections}
        renderItem={({ item }) => (
          <CollectionCard collection={item} handleRefresh={fetchOtherProfile} />
        )}
        keyExtractor={(item) => item._id}
        style={styles.collections}
      />
    );
  };

  const LikedPoemsView = ({ poems }) => {
    return (
      <FlatList
        data={poems}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <PoemCard
            key={item._id}
            poemId={item._id}
            userId={otherUserId}
            title={item.title}
            author={item.author}
            excerpt={item.content}
            onPress={() => handlePoemPress(item)}
            likes={item.likes.length}
            inLikes={item.likes.includes(userId)}
            handleRefresh={fetchOtherProfile}
          />
        )}
      />
    );
  };

  const LikedCollectionsView = ({ likedCollections }) => {
    return (
      <View>
        <FlatList
          data={likedCollections}
          renderItem={({ item }) => (
            <CollectionCard
              collection={item}
              handleRefresh={fetchOtherProfile}
            />
          )}
          keyExtractor={(item) => item._id}
          style={styles.collections}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.settingsButton}>
          <Ionicons name="chevron-back" size={26} color="#373F41" />
        </View>
      </TouchableOpacity>

      <View>
        <View style={styles.innerContainer}>
          <View style={styles.topSection}>
            <Image
              source={{
                uri: otherUser?.profilePicture,
              }}
              style={styles.profilePic}
            />

            <View style={styles.metrics}>
              <View style={styles.metric}>
                <Text style={styles.metricNumber}>
                  {otherUser?.createdCollections?.length}
                </Text>
                <Text style={styles.metricName}>Collections</Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("FollowersScreen", {
                    followerList: otherUser?.followers,
                    loggedInUser: userId,
                    followingList: otherUser?.following,
                  })
                }
              >
                <View style={styles.metric}>
                  <Text style={styles.metricNumber}>
                    {otherUser?.followers?.length}
                  </Text>
                  <Text style={styles.metricName}>Followers</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("FollowingScreen", {
                    followingList: otherUser?.following,
                    loggedInUser: userId,
                  })
                }
              >
                <View style={styles.metric}>
                  <Text style={styles.metricNumber}>
                    {otherUser?.following?.length}
                  </Text>
                  <Text style={styles.metricName}>Following</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.names}>
            <Text style={styles.name}>{otherUser?.name}</Text>
            <Text style={styles.username}>@{otherUser?.username}</Text>
          </View>

          <View style={styles.stats}>
            <View style={styles.stat}>
              <Ionicons name="flame-outline" size={22} color="#658049" />
              <Text style={styles.statText}>12 PoTDs</Text>
            </View>

            <View style={styles.stat}>
              <Ionicons name="book-outline" size={22} color="#658049" />
              <Text style={styles.statText}>132 poems</Text>
            </View>

            <View style={styles.stat}>
              <Ionicons name="globe-outline" size={22} color="#658049" />
              <Text style={styles.statText}>22 contributions</Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={handlePress} style={styles.centerAligned}>
        {following ? (
          <View style={styles.unfollowButton}>
            <Ionicons name="person-remove-outline" size={17} color="#644980" />
            <Text style={styles.unfollowText}>Unfollow</Text>
          </View>
        ) : (
          <View style={styles.followButton}>
            <Ionicons name="person-add-outline" size={17} color="white" />
            <Text style={styles.followText}>Follow</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.segmentedControl}>
        <TouchableOpacity
          onPress={() => setSegmentedControlView("Collections")}
        >
          <View
            style={
              segmentedControlView === "Collections"
                ? styles.segmentedControlSelected
                : styles.segmentedControlUnselected
            }
          >
            <Text
              style={
                segmentedControlView === "Collections"
                  ? styles.segmentedControlSelectedText
                  : styles.segmentedControlUnselectedText
              }
            >
              Collections
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSegmentedControlView("Liked poems")}
        >
          <View
            style={
              segmentedControlView === "Liked poems"
                ? styles.segmentedControlSelected
                : styles.segmentedControlUnselected
            }
          >
            <Text
              style={
                segmentedControlView === "Liked poems"
                  ? styles.segmentedControlSelectedText
                  : styles.segmentedControlUnselectedText
              }
            >
              Liked poems
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSegmentedControlView("Liked Collections")}
        >
          <View
            style={
              segmentedControlView === "Liked Collections"
                ? styles.segmentedControlSelected
                : styles.segmentedControlUnselected
            }
          >
            <Text
              style={
                segmentedControlView === "Liked Collections"
                  ? styles.segmentedControlSelectedText
                  : styles.segmentedControlUnselectedText
              }
            >
              Liked Collections
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.leftAligned}>
        {segmentedControlView === "Collections" && (
          <CollectionsView collections={collections} />
        )}
        {segmentedControlView === "Liked poems" && (
          <LikedPoemsView poems={poems} />
        )}
        {segmentedControlView === "Liked Collections" && (
          <LikedCollectionsView likedCollections={likedCollections} />
        )}
      </View>

    </SafeAreaView>
  );
};

export default UserDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  centerAligned: {
    alignItems: "center",
  },
  innerContainer: {
    marginTop: 10,
    paddingLeft: 20,
  },

  topSection: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 40,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  names: {
    marginTop: 10,
    flexDirection: "column",
    columnGap: 10,
  },
  name: {
    fontSize: 18,
    fontFamily: "HammersmithOne",
    color: "#373F41",
    flexDirection: "column",
    alignContent: "center",
  },
  username: {
    fontSize: 15,
    fontFamily: "Sarabun-Regular",
    color: "#6C7476",
  },
  metrics: {
    flexDirection: "row",
    columnGap: 20,
  },
  metric: {
    alignItems: "center",
  },
  metricNumber: {
    fontSize: 20,
    fontFamily: "HammersmithOne",
    color: "#373F41",
  },
  metricName: {
    fontFamily: "Sarabun-Regular",
    color: "#6C7476",
  },
  leftAligned: {},
  stats: {
    marginTop: 20,
    flexDirection: "row",
    columnGap: 28,
  },

  stat: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },

  statText: {
    fontFamily: "Sarabun-Medium",
    fontSize: 15,
  },
  followButton: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 7,
    backgroundColor: "#644980",
    marginTop: 15,
  },
  followText: {
    fontSize: 17,
    fontFamily: "HammersmithOne",
    color: "#fff",
  },
  unfollowButton: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
    borderColor: "#644980",
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 7,
    backgroundColor: "white",
    marginTop: 15,
  },
  unfollowText: {
    fontSize: 17,
    fontFamily: "HammersmithOne",
    color: "#644980",
  },
  segmentedControl: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "93%",
    marginTop: 60,
    marginBottom: 10,
    borderRadius: 100,
    paddingHorizontal: 4,
    paddingVertical: 4,
    backgroundColor: "#E1DBE6",
    alignSelf: 'center'
  },
  segmentedControlSelected: {
    borderRadius: 100,
    width: 120,
    paddingVertical: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  segmentedControlSelectedText: {
    color: "#373F41",
    fontSize: 15,
    fontFamily: "HammersmithOne",
  },
  segmentedControlUnselected: {
    borderRadius: 5,
    width: 118,
    paddingVertical: 10,
    alignItems: "center",
  },
  segmentedControlUnselectedText: {
    fontSize: 15,
    fontFamily: "HammersmithOne",
    color: "#373F41",
  },
  leftAligned: {
    paddingHorizontal: 17,
  },
  createCollectionCTA: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 7,
    marginTop: 15,
  },
  createCollectionText: {
    fontSize: 17,
    color: "#373F41",
    fontFamily: "HammersmithOne",
  },
  collections: {
    marginTop: 8,
    paddingHorizontal: 8,
    paddingTop: 12,
    height: 400,
  },
  collection: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  collectionMain: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
  },
  collectionPic: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  collectionText: {
    rowGap: 5,
  },
  collectionName: {
    fontSize: 18,
    fontFamily: "HammersmithOne",
    color: "#373F41",
  },
  collectionStat: {
    fontSize: 15,
    fontFamily: "Sarabun-Regular",
    color: "#6C7476",
  },
  ownershipTag: {
    borderWidth: 1,
    borderRadius: 100,
    height: 25,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  ownershipText: {
    fontSize: 15,
  },
  savedQuote: {
    rowGap: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E2E5E6",
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#F4F5F4",
  },
  savedQuoteText: {
    fontSize: 18,
    fontFamily: "Sarabun-Regular",
    color: "#373F41",
  },
  savedQuoteCTAs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewPoem: {
    flexDirection: "row",
    overflow: "visible",
    color: "red",
  },
  viewPoemText: {
    fontSize: 17,
    fontFamily: "Sarabun-SemiBold",
    color: "#6C7476",
  },
  settingsButton: {
    alignItems: "flex-start",
    marginLeft: 24,
    marginTop: 16,
  },
});
