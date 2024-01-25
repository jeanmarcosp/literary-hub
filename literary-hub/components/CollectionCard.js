import "react-native-gesture-handler";
import React, { useState, useEffect, useCallback, useContext } from "react";
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
import { useFocusEffect } from "@react-navigation/native";

const CollectionCard = ({
  collectionId,
  userId,
  coverImage,
  title,
  caption,
  creator,
  size,
  likes,
  inLikes,
  handleRefresh,
}) => {
  const navigation = useNavigation();
  const poemText = size === 1 ? "poem" : "poems";
  const likeText = likes === 1 ? "like" : "likes";

  const [liked, setLiked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [userIsCreator, setUserIsCreated] = useState(false);

  const handleLikeCollection = async () => {
    try {
      const response = await axios.put(
        `${ROOT_URL}/collections/${collectionId}/${userId}/like`
      );

      // If the request is successful, update the state or perform any other action
      const updatedCollection = response.data;

      // Set the liked state to true (or perform any other state update)
      setLiked(true);
      handleRefresh();
    } catch (error) {
      console.error("Error liking collection:", error);
      // Handle errors or perform any other action
    }
  };

  const handleUnlikeCollection = async () => {
    try {
      const response = await axios.put(
        `${ROOT_URL}/collections/${collectionId}/${userId}/unlike`
      );

      // If the request is successful, update the state or perform any other action
      const updatedCollection = response.data;

      // Set the liked state to false (or perform any other state update)
      setLiked(false);
      handleRefresh();
    } catch (error) {
      console.error("Error unliking collection:", error);
      // Handle errors or perform any other action
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

  // useEffect(() => {
  //   const fetchCreatorUserId = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3000/get-creator/${collectionId}`);
  //       const { creatorId } = response.data;

  //       creatorId === userId ? setUserIsCreated(true) : setUserIsCreated(false);

  //     } catch (error) {
  //       console.error('Error fetching creator userId:', error);
  //     }
  //   };

  //   fetchCreatorUserId();

  // }, []); // Empty dependency array for one-time effect

  // console.log(userIsCreator)

  const ShareMenu = ({ isVisible, children, onClose }) => {
    return (
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>Collection Actions</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {children}
        </View>
      </Modal>
    );
  };

  const onShare = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("CollectionScreen")}
    >
      <View style={styles.container}>
        <View style={styles.info}>
          <Image
            source={{
              uri: coverImage,
            }}
            style={styles.image}
          />
          <View style={styles.text}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.creator}>@{creator}</Text>
            </View>
            <Text style={styles.caption}>{caption}</Text>
          </View>
        </View>

        <View style={styles.rightInfo}>
          <TouchableOpacity onPress={onShare}>
            <Ionicons name="ellipsis-horizontal" size={20} color="black" />
          </TouchableOpacity>
          <View style={styles.poemNumberTag}>
            <Text style={styles.poemNumberText}>
              {size} {poemText}
            </Text>
          </View>

          <View style={styles.likes}>
            <Like
              inLikes={inLikes}
              handleLike={handleLikeCollection}
              handleDislike={handleUnlikeCollection}
            />
            <Text style={styles.likeNumber}>
              {likes} {likeText}
            </Text>
          </View>
        </View>
      </View>
      <ShareMenu isVisible={isModalVisible} onClose={onModalClose}>
        <TouchableOpacity>
          <View style={styles.listItems}>
            <Ionicons name="share-outline" size={24} color="black" />
            <Text style={styles.listText}>Share</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.listItems}>
            <Ionicons name="create-outline" size={24} color="black" />
            <Text style={styles.listText}>Edit</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteCollection}>
          <View style={styles.listItems}>
            <Ionicons name="trash-outline" size={24} color="red" />
            <Text
              style={{
                color: "red",
                fontSize: 18,
                fontFamily: "Sarabun-Regular",
              }}
            >
              Delete
            </Text>
          </View>
        </TouchableOpacity>
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
  },

  creator: {
    fontFamily: "Sarabun-Regular",
    fontSize: 16,
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
  },
  modalTitleContainer: {
    height: "16%",
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
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

  listItems: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
  },

  listText: {
    color: "black",
    fontSize: 18,
    fontFamily: "Sarabun-Regular",
  },
});

export default CollectionCard;
