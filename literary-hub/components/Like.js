import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { React } from 'react'

const Like = ({ inLikes, handleLike, handleDislike }) => {
  return (
    <View style={styles.like}>
      <TouchableOpacity onPress={inLikes ? handleDislike : handleLike}>
        {inLikes ? (
          <Ionicons name="heart" size={24} color="#644980" />
        ) : (
          <Ionicons name="heart-outline" size={24} color="#644980" />
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
