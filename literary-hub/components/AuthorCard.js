import "react-native-gesture-handler";

import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import Like from "./Like";
import { useNavigation } from "@react-navigation/native";
import { handleLikeCollection, handleUnlikeCollection } from "../hooks/collectionActions";
import getUserId from "../hooks/getUserId";
import { useState, React } from "react";

const AuthorCard = ({ collection }) => {
  const navigation = useNavigation();
  const collectionId = collection._id
  const userId = getUserId();
  const userIsCreator = collection.user === userId;

  const [likesCount, setLikesCount] = useState(collection.likes.length);

  const updateLikes = async (isLike) => {
    try {
      if (!isLike) {
        await handleUnlikeCollection(userId, collectionId);
        setLikesCount(prevCount => prevCount - 1);
      } else {
        await handleLikeCollection(userId, collectionId);
        setLikesCount(prevCount => prevCount + 1);
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.card} 
    onPress={() => navigation.navigate("CollectionScreen", {collection})}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View style={styles.likes}>
          <Like
              inLikes={collection.likes.includes(userId)}
              handleLike={() => updateLikes(true)}
              handleDislike={() => updateLikes(false)}
            />
            <Text>{likesCount}</Text>
          </View>
        </View>

        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{collection.title}</Text>
          <Text style={styles.authorDates}>{collection.poemsInCollection.length} poems</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: 20,
    marginVertical: 10,
  },
  container: {
    width: 150,
    height: 150,
    padding: 14,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },

  topRow: {
    flexDirection: "row",
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  image: {
    width: 45,
    height: 45,
    borderRadius: 100,
    padding: 5,
  },

  likes: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },

  authorInfo: {
    rowGap: 3,
  },

  authorName: {
    fontFamily: "Sarabun-SemiBold",
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: 18,
    lineHeight: 23,
    marginTop: 17,
  },

  authorDates: {
    fontFamily: 'Sarabun-Light',
    color: '#6C7476'
  }

  // title: {
  //   fontFamily: "HammersmithOne",
  //   display: "flex",
  //   fontSize: 10,
  //   color: "#373F41",
  //   padding: 0,
  //   lineHeight: 30,
  //   marginTop: 15,
  //   textAlign: "left",
  // },

});

export default AuthorCard;
