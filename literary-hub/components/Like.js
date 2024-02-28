import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { React, useState } from 'react'
import { useEffect } from 'react';

const Like = ({ inLikes, handleLike, handleDislike }) => {
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

const styles = StyleSheet.create({
  like: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 2,
    padding: 3, 
  },
  count: {
    fontFamily: "PromptRegular",
    fontSize: 15,
  },
});

export default Like;