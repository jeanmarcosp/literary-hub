import "react-native-gesture-handler";
import { React, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import Like from "./Like";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import getUserId from "../hooks/getUserId";
import ShareMenu from "./ShareMenu";
import { handleLikeCollection, handleUnlikeCollection } from "../hooks/collectionActions";

const CollectionCard = ({ collection, handleRefresh }) => {
  const navigation = useNavigation();

  const userId = getUserId();
  const collectionId = collection._id;

  const poemText = collection.poemsInCollection.length === 1 ? "poem" : "poems";
  const likeText = collection.likes.length === 1 ? "like" : "likes";
  const userIsCreator = collection.user === userId;
  const [isModalVisible, setIsModalVisible] = useState(false); //prob cause of liking lag on profile

  const handleLikeCollection = async () => {
    try {
      const response = await axios.put(
        `${ROOT_URL}/collections/${collectionId}/${userId}/like`
      );
      handleRefresh();
    } catch (error) {
      console.error("Error liking collection:", error);
    }
  };

  const handleUnlikeCollection = async () => {
    try {
      const response = await axios.put(
        `${ROOT_URL}/collections/${collectionId}/${userId}/unlike`
      );
      handleRefresh();
    } catch (error) {
      console.error("Error unliking collection:", error);

    }
  };

  const handleDeleteCollection = async () => {
    try {
      const response = await axios.delete(
        `${ROOT_URL}/delete-collection?userId=${userId}&collectionId=${collectionId}`
      );

      const message = response.data;
      console.log(message);
      setIsModalVisible(false);
      if (message.success) {
        Alert.alert("Success", "Collection deleted successfully");
      }
      handleRefresh();
    } catch (error) {
      console.error("Error deleting collection:", error);
      Alert.alert("Error", "Error deleting collection");
    }
  };

  const handleEditCollection = () => {
    setIsModalVisible(false);
    navigation.navigate("EditCollectionScreen", { collection })
  }

  const onShare = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("CollectionScreen", { collection, handleRefresh })}
    >
      <View style={styles.container}>
        <View style={styles.info}>
          <Image
            source={collection.coverArt ? { uri: collection.coverArt } : require('../assets/collection-images/defaultCover.jpeg')}
            style={styles.image}
          />
          <View style={styles.text}>
            <View>
              <Text style={styles.title}>{collection.title}</Text>
              {collection.username && (
                <Text style={styles.creator}>@{collection.username}</Text>
              )}
            </View>
            <Text style={styles.caption}>{collection.caption}</Text>
          </View>
        </View>

        <View style={styles.rightInfo}>
          {userIsCreator ? (
            <TouchableOpacity onPress={onShare}>
              <Ionicons name="ellipsis-horizontal" size={20} color="black" />
            </TouchableOpacity>
          ) : (
            null
          )}
          
          <View style={styles.poemNumberTag}>
            <Text style={styles.poemNumberText}>
              {collection.poemsInCollection.length} {poemText}
            </Text>
          </View>

          <View style={styles.likes}>
            <Like
              inLikes={collection.likes.includes(userId)}
              handleLike={() => handleLikeCollection(userId, collectionId)}
              handleDislike={() => handleUnlikeCollection(userId, collectionId)}
            />
            <Text style={styles.likeNumber}>{collection.likes.length}</Text>
          </View>
        </View>
      </View>
      <ShareMenu isVisible={isModalVisible} onClose={onModalClose}>
        {userIsCreator ? (
          <>
            <View style={styles.actions}>
              {/* <TouchableOpacity>
                <View style={styles.listItems}>
                  <View style={styles.iconContainer}>
                    <Ionicons name="share-outline" size={24} color="#434344" />
                  </View>
                  <Text style={styles.listText}>Share</Text>
                </View>
              </TouchableOpacity> */}

              <TouchableOpacity onPress={handleEditCollection}>
                <View style={styles.listItems}>
                  <View style={styles.iconContainer}>
                    <Ionicons name="create-outline" size={24} color="#434344" />
                  </View>
                  <Text style={styles.listText}>Edit</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleDeleteCollection}>
                <View style={styles.listItems}>
                  <View style={styles.iconContainer}>
                    <Ionicons name="trash-outline" size={24} color="red" />
                  </View>
                  <Text
                    style={{
                      color: "red",
                      fontSize: 16,
                      fontFamily: "Sarabun-Medium",
                    }}
                  >
                    Delete
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity>
              <View style={styles.listItems}>
                <View style={styles.iconContainer}>
                  <Ionicons name="share-outline" size={24} color="black" />
                </View>
                <Text style={styles.listText}>Share</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ShareMenu>
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
    maxWidth: 150,
  },

  creator: {
    fontFamily: "Sarabun-Regular",
    fontSize: 14,
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

  modalContent: {
    height: "25%",
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },

  modalTitleContainer: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  modalTitle: {
    color: "black",
    fontSize: 18,
    fontFamily: "HammersmithOne",
  },

  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 20,
    backgroundColor: "red",
  },

  actions: {
    flexDirection: 'row',
    columnGap: 20,
    marginLeft: 20,
    marginTop: 10,
  },

  listItems: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 5,
  },

  iconContainer: {
    padding: 15,
    backgroundColor: '#F1EEF3',
    borderRadius: 100,
  },

  listText: {
    color: "#434344",
    fontSize: 16,
    fontFamily: "Sarabun-Medium",
  },
});

export default CollectionCard;
