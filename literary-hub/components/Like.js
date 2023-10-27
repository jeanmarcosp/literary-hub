import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  useFonts,
  Prompt_400Regular,
  Prompt_500Medium,
  Prompt_600SemiBold,
} from "@expo-google-fonts/prompt";

const Like = () => {
  const [fontsLoaded] = useFonts({
    PromptRegular: Prompt_400Regular,
    PromptMedium: Prompt_500Medium,
    PromptSemiBold: Prompt_600SemiBold,
  });
  return (
    <View style={styles.like}>
      <Ionicons name="heart-outline" size={20} color="black" />
      <Text style={styles.count}>10k</Text>
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
    fontFamily: 'PromptRegular',
    fontSize: 15,
  }
});

export default Like;
