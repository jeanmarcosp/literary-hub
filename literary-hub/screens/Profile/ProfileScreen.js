import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import getUserId from "../../hooks/getUserId";
import axios from "axios";
import PoemCard from "../../components/PoemCard";
import CollectionCard from "../../components/CollectionCard";

const ProfileScreen = () => {
  const userId = getUserId();
  const [user, setUser] = useState({});
  const [poems, setPoems] = useState([]);
  const [collections, setCollections] = useState([]);
  const [likedCollections, setLikedCollections] = useState([]);
  const [segmentedControlView, setSegmentedControlView] =
    useState("My Collections");
  const navigation = useNavigation();

  const handlePoemPress = (poem) => {
    console.log("pressed poem card");
    navigation.navigate("PoemDetailScreen", {
      poem: poem,
      isLiked: true,
      comments: poem.comments,
      // handleRefresh: { fetchProfile },
    });
  };

  // this gets the users information stored in user?.
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${ROOT_URL}/profile/${userId}`);
      const user = response.data.user;

      setUser(user);
    } catch (error) {
      console.log("error", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchProfile();
    }, [userId])
  );

  console.log(user.name);

  // fetch poems
  useEffect(() => {
    const fetchLikedPoems = async () => {
      try {
        const poemIdsToFetch = user?.likedPoems;

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
  }, [user]);

  // fetch created collections
  useEffect(() => {
    // Fetch collections based on user's createdCollections
    const fetchCreatedCollections = async () => {
      try {
        const collectionIdsToFetch = user?.createdCollections;

        // Check if collectionIdsToFetch is truthy before making the API call
        if (collectionIdsToFetch) {
          const response = await axios.get(`${ROOT_URL}/collections-by-ids`, {
            params: {
              collectionIds: collectionIdsToFetch,
            },
          });

          const fetchedCollections = response.data;

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
  }, [user]);

  // fetch liked collections
  useEffect(() => {
    // Fetch collections based on user's createdCollections
    const fetchLikedCollections = async () => {
      try {
        const collectionIdsToFetch = user?.likedCollections;

        // Check if collectionIdsToFetch is truthy before making the API call
        if (collectionIdsToFetch) {
          const response = await axios.get(`${ROOT_URL}/collections-by-ids`, {
            params: {
              collectionIds: collectionIdsToFetch,
            },
          });

          const fetchedLikedCollections = response.data;
          
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
  }, [user]);

  const CollectionsView = ({ collections }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CreateCollectionScreen", {
              username: user.username,
            })
          }
        >
          <View style={styles.createCollectionCTA}>
            <Ionicons name="add" size={22} color="#373F41" />
            <Text style={styles.createCollectionText}>
              Create new collection
            </Text>
          </View>
        </TouchableOpacity>
        <FlatList
          data={collections}
          renderItem={({ item }) => (
            <CollectionCard collection={item} handleRefresh={fetchProfile} />
          )}
          keyExtractor={(item) => item._id}
          style={styles.collections}
          contentInset={{ bottom: 80 }}
        />
      </View>
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
            userId={userId}
            title={item.title}
            author={item.author}
            excerpt={item.content}
            onPress={() => handlePoemPress(item)}
            likes={item.likes.length}
            inLikes={item.likes.includes(userId)}
            handleRefresh={fetchProfile}
          />
        )}
        style={styles.collections}
        contentInset={{ bottom: 40 }}
      />
    );
  };

  const LikedCollectionsView = ({ likedCollections }) => {
    return (
      <View>
        <FlatList
          data={likedCollections}
          renderItem={({ item }) => (
            <CollectionCard collection={item} handleRefresh={fetchProfile} />
          )}
          keyExtractor={(item) => item._id}
          style={styles.collections}
          contentInset={{ bottom: 40 }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
        <View style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={26} color="#373F41" />
        </View>
      </TouchableOpacity>
      <View style={styles.innerContainer}>

        <View style={styles.topSection}>
          <Image
            source={{
              uri: user?.profilePicture,
            }}
            style={styles.profilePic}
          />

          <View style={styles.metrics}>
            <View style={styles.metric}>
              <Text style={styles.metricNumber}>
                {user?.createdCollections?.length}
              </Text>
              <Text style={styles.metricName}>Collections</Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("FollowersScreen", {
                  followerList: user?.followers,
                  loggedInUser: userId,
                  followingList: user?.following,
                })
              }
            >
              <View style={styles.metric}>
                <Text style={styles.metricNumber}>{user?.followers?.length}</Text>
                <Text style={styles.metricName}>Followers</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("FollowingScreen", {
                  followingList: user?.following,
                  loggedInUser: userId,
                })
              }
            >
              <View style={styles.metric}>
                <Text style={styles.metricNumber}>{user?.following?.length}</Text>
                <Text style={styles.metricName}>Following</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.names}>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.username}>@{user?.username}</Text>
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

        <View style={styles.segmentedControl}>
          <TouchableOpacity
            onPress={() => setSegmentedControlView("My Collections")}
          >
            <View
              style={
                segmentedControlView === "My Collections"
                  ? styles.segmentedControlSelected
                  : styles.segmentedControlUnselected
              }
            >
              <Text
                style={
                  segmentedControlView === "My Collections"
                    ? styles.segmentedControlSelectedText
                    : styles.segmentedControlUnselectedText
                }
              >
                My collections
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
                Liked collections
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      

      <View style={styles.leftAligned}>
        {segmentedControlView === "My Collections" && (
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

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  innerContainer: {
    marginTop: 10,
    paddingLeft: 20,
  },

  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
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

  stats: {
    marginTop: 20,
    flexDirection: 'row',
    columnGap: 28,
  },

  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },

  statText: {
    fontFamily: 'Sarabun-Medium',
    fontSize: 15,
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

  leftAligned: {},

  createCollectionCTA: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 7,
    marginTop: 10,
    paddingLeft: 18,
  },

  createCollectionText: {
    fontSize: 17,
    color: "#373F41",
    fontFamily: "HammersmithOne",
  },

  collections: {
    marginTop: 8,
    paddingHorizontal: 18,
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
    alignItems: "flex-end",
    marginRight: 20,
    marginTop: 5,
  },
});
