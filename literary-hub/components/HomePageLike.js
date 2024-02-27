import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { React, useState } from 'react'


const HomePageLike = ({ inLikes, handleLike, handleDislike }) => {
  const [liked, setLiked] = useState(inLikes);

  const handlePress = () => {
    if (liked) {
      handleDislike();
    } else {
      handleLike();
    }
    setLiked(!liked);
  };
  
  return (
    <View style={styles.like}>
      <TouchableOpacity onPress={handlePress}>
        {liked ? (
          <Ionicons name="heart" size={28} color="#644980" />
        ) : (
          <Ionicons name="heart-outline" size={28} color="#644980" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  like: {
    position: "absolute",
    right: screenWidth * 0.05, 
    bottom: screenHeight * 0.12, 
  },
  count: {
    fontFamily: "PromptRegular",
    fontSize: 15,
  },
});

export default HomePageLike;
