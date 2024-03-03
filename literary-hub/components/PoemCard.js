import "react-native-gesture-handler";
import { React, useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Like from "./Like";
import axios from "axios";
import getUserId from "../hooks/getUserId";
import { useNavigation } from "@react-navigation/native";
import { poemToPage } from '../hooks/poemActions';




const PoemCard = ({
  poemId,
  userId,
  title,
  author,
  excerpt,
  likes,
  timeEstimate,
  inLikes,
  handleRefresh,
  onPress,
  ...props
}) => {
  
  const likeText = likes === 1 ? "like" : "likes";
  const loggedUser = getUserId();
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState({});


  
  const navigateToSinglePoem = (poem, poemId, userLikedPoems ) => {
    //console.log(poem);
    // console.log(poem);
    // console.log(poemId);
    // console.log(userLikedPoems);
    //console.log("I AM GOING TO SINGLE POEM AT NOW");
    const poemData = poem.poem ? poem.poem : poem;
    //console.log(poemData);
    poemToPage([poemData], 15);
    //console.log(poemData);
    navigation.navigate('SinglePoem', { poem:poemData, poemId, userLikedPoems, fromHome:false }); 
  };

  const fetchProfile = async () => {
    try {
      //console.log(loggedUser);
      const response = await axios.get(`${ROOT_URL}/profile/${loggedUser}`);
      const user = response.data.user;

      setUser(user);
    } catch (error) {
      //console.log("didn't get user");
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [])

  // / i need to get poem, poemId, userLikedPoems
  const handlePoemPress = (poemId) => {
    axios.get(`${ROOT_URL}/poem/${poemId}`)
      .then((response) => {
        const updatedPoem = response.data;
        console.log("pressed poem card");
        const likedPoems = user?.likedPoems;
        //console.log(updatedPoem);
        //console.log(likedPoems);
        navigateToSinglePoem(updatedPoem, poemId, likedPoems);
      })
      .catch((error) => {
        console.error("Error finding poem:", error);
      });
  };

  const handleLikePoem = async () => {
    try {
      const response = await axios.put(`${ROOT_URL}/poems/${poemId}/${loggedUser}/like`);
      const updatedPoem = response.data;

      setLiked(true);
      handleRefresh();
    } catch (error) {
      console.error("Error liking poem:", error);
    }
  };

  const handleUnlikePoem = async () => {
    try {
      const response = await axios.put(`${ROOT_URL}/poems/${poemId}/${loggedUser}/unlike`);
      const updatedPoem = response.data;

      setLiked(false);
      handleRefresh();
    } catch (error) {
      console.error("Error unliking poem:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => handlePoemPress(poemId)}>
      <View style={styles.container}>
        <View style={styles.leftInfo}>
          <View style={styles.mainInfo}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.author}>by {author}</Text>
          </View>
          <Text style={styles.excerpt} numberOfLines={2} ellipsizeMode="tail">
            {excerpt.split("\n").slice(0, 2).join("\n")}
          </Text>
        </View>

        <View style={styles.rightInfo}>
          <View style={styles.poemLengthTag}>
            <Text style={styles.poemLengthText}>{timeEstimate} min</Text>
          </View>

          <View style={styles.likes}>
            <Like
              inLikes={inLikes}
              handleLike={handleLikePoem}
              handleDislike={handleUnlikePoem}
            />
            <Text style={styles.likeNumber}>
              {likes} {likeText}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: "visible",
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingHorizontal: 18,
    paddingVertical: 18,
    backgroundColor: "white",
    borderRadius: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    overflow: "visible",
  },

  leftInfo: {
    flexDirection: "column",
    width: "80%",
  },

  mainInfo: {
    rowGap: 2,
  },

  title: {
    fontFamily: "Sarabun-Bold",
    fontSize: 18,
    color: "#373F41",
  },

  author: {
    fontFamily: "Sarabun-Regular",
    fontSize: 15,
    color: "grey",
  },

  excerpt: {
    fontFamily: "Sarabun-Regular",
    fontSize: 14,
    color: "#373F41",
    marginTop: 10,
  },

  rightInfo: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  poemLengthTag: {
    borderWidth: 1,
    borderColor: "#D6CEDF",
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "#F9F3FF",
  },

  poemLengthText: {
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
});

export default PoemCard;
