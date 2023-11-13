import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { React, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import getUserId from "../../hooks/getUserId";
import axios from "axios";
import PoemCard from "../../components/PoemCard";
import CollectionCard from "../../components/CollectionCard";

const ProfileScreen = () => {
  const userId = getUserId();
  const [user, setUser] = useState({});
  const [poems, setPoems] = useState([]);
  const [collections, setCollections] = useState([]);
  const [segmentedControlView, setSegmentedControlView] = useState("Collections");

  console.log(user._id)

  // this gets the users information stored in user?.
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${ROOT_URL}/profile/${userId}`);
        const user = response.data.user;

        setUser(user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchProfile();
  }, []);

  // this gets all the poems liked by a user
  useEffect(() => {
    const fetchData = async () => {
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
        console.error("Error fetching poems:", error);
      }
    };

    fetchData();
  }, []);

  // gets the users created collections
  useEffect(() => {
    const collectionIdsToFetch = user?.createdCollections;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${ROOT_URL}/collections-by-ids`, {
          params: {
            collectionIds: collectionIdsToFetch,
          },
        });

        const fetchedCollections = response.data;

        setCollections(fetchedCollections);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchData();
  }, []);

  const savedQuotesData = [
    {
      id: "1",
      poemId: "1",
      quote:
        "Tis better to have loved and lost than never to have loved at all",
    },
    {
      id: "2",
      poemId: "2",
      quote:
        "A light from the shadows shall spring; Renewed shall be blade that was broken, The crownless again shall be king",
    },
    {
      id: "3",
      poemId: "3",
      quote: "Tread softly because you tread on my dreams",
    },
  ];

  const CollectionsView = ({ collections }) => {
    const navigation = useNavigation();
   
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateCollectionScreen")}
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
            <CollectionCard
              key={item._id}
              coverImage={item.coverArt}
              title={item.title}
              creator={item.author}
              caption={item.caption}
              size={item.poemsInCollection.length}
              likes={item.likes.length}
            />
          )}
          keyExtractor={(item) => item._id}
          style={styles.collections}
        />
      </View>
    );
  };

  const LikedPoemsView = ({ poems }) => {
    return (
      <View>
        <FlatList
          data={poems}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => {
            return (
              <PoemCard
                key={item._id}
                title={item.title}
                author={item.author}
                excerpt={item.content}
                likes={0} // not dynamic!!
                // likes={item.likes.length} dynamic, change when we reload poems into DB
              />
            );
          }}
        />
      </View>
    );
  };

  const SavedQuotesView = () => {
    return (
      <FlatList
        data={savedQuotesData}
        renderItem={({ item }) => (
          <SavedQuote poemId={item.poemId} quote={item.quote} />
        )}
        keyExtractor={(item) => item.id}
        style={styles.collections}
      />
    );
  };

  const SavedQuote = ({ poemId, quote }) => {
    const [saved, setSaved] = useState(true);

    return (
      <View style={styles.savedQuote}>
        <Text style={styles.savedQuoteText}>"{quote}"</Text>
        <View style={styles.savedQuoteCTAs}>
          <TouchableOpacity>
            <View style={styles.viewPoem}>
              <Text style={styles.viewPoemText}>View poem</Text>
              <Ionicons name="chevron-forward" size={17} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSaved(!saved)}>
            {saved ? (
              <Ionicons name="bookmark" size={25} color="black" />
            ) : (
              <Ionicons name="bookmark-outline" size={25} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerAligned}>
        <Image
          source={{
            uri: "https://i.pinimg.com/originals/22/8f/c5/228fc5d11fdb37c06bbbed785b9637a7.jpg",
          }}
          style={styles.profilePic}
        />

        <View style={styles.names}>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.username}>@{user?.username}</Text>
        </View>

        <View style={styles.metrics}>
          <View style={styles.metric}>
            <Text style={styles.metricNumber}>
              {user?.createdCollections?.length}
            </Text>
            <Text style={styles.metricName}>Collections</Text>
          </View>

          <View style={styles.metric}>
            <Text style={styles.metricNumber}>{user?.followers?.length}</Text>
            <Text style={styles.metricName}>Followers</Text>
          </View>

          <View style={styles.metric}>
            <Text style={styles.metricNumber}>{user?.following?.length}</Text>
            <Text style={styles.metricName}>Following</Text>
          </View>
        </View>

        {/* <TouchableOpacity>
          <View style={styles.followButton}>
            <Ionicons name="person-add-outline" size={17} color="white" />
            <Text style={styles.followText}>Follow</Text>
          </View>
        </TouchableOpacity> */}

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
            onPress={() => setSegmentedControlView("Saved quotes")}
          >
            <View
              style={
                segmentedControlView === "Saved quotes"
                  ? styles.segmentedControlSelected
                  : styles.segmentedControlUnselected
              }
            >
              <Text
                style={
                  segmentedControlView === "Saved quotes"
                    ? styles.segmentedControlSelectedText
                    : styles.segmentedControlUnselectedText
                }
              >
                Saved quotes
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.leftAligned}>
        {segmentedControlView === "Collections" && (
          <CollectionsView collections={collections} />
        )}
        {segmentedControlView === "Liked poems" && (
          <LikedPoemsView poems={poems} />
        )}
        {segmentedControlView === "Saved quotes" && <SavedQuotesView />}
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  centerAligned: {
    alignItems: "center",
  },

  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    marginTop: 20,
  },

  names: {
    marginTop: 10,
  },

  name: {
    fontSize: 20,
    fontFamily: "HammersmithOne",
    color: "#373F41",
  },

  username: {
    fontSize: 15,
    fontFamily: "HammersmithOne",
    color: "#373F41",
    marginLeft: 15,
  },

  metrics: {
    flexDirection: "row",
    columnGap: 20,
    marginTop: 10,
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
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#E2E5E6",
    paddingHorizontal: 2,
    paddingVertical: 2,
    backgroundColor: "#E1DBE6",
  },

  segmentedControlSelected: {
    borderRadius: 100,
    width: 118,
    paddingVertical: 10,
    backgroundColor: "#fff",
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
    marginTop: 20,
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
  },

  viewPoemText: {
    fontSize: 17,
    fontFamily: "Sarabun-SemiBold",
    color: "#6C7476",
  },
});
