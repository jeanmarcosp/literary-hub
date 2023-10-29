import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { React, useState }from 'react'
import {
  useFonts,
  Prompt_400Regular,
  Prompt_500Medium,
  Prompt_600SemiBold,
} from "@expo-google-fonts/prompt";

const Like = () => {
  const [liked, setLiked] = useState(false);
  return (
    <TouchableOpacity onPress={() => setLiked(!liked)}>
      {liked ? (
        <Ionicons name="heart" size={24} color="#644980" />
      ) : (
        <Ionicons name="heart-outline" size={24} color="#644980" />
      )}
    </TouchableOpacity>
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
