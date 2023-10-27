import "react-native-gesture-handler";
import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import Like from "./Like";
import {
  useFonts,
  Prompt_400Regular,
  Prompt_500Medium,
  Prompt_600SemiBold,
} from "@expo-google-fonts/prompt";

const AuthorCard = ({ coverImage, title }) => {
  // Load the "Prompt" fonts for Regular (400), Medium (500), and Semi-Bold (600) weights
  const [fontsLoaded] = useFonts({
    PromptRegular: Prompt_400Regular,
    PromptMedium: Prompt_500Medium,
    PromptSemiBold: Prompt_600SemiBold,
  });

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <Image source={coverImage} style={styles.image} />
          <Like />
        </View>
        <View>
          <Text
            style={{
              fontFamily: "PromptMedium",
              textAlign: "left",
              textAlignVertical: "center",
              fontSize: 22,
              lineHeight: 28,
              marginTop: 17,
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    
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
  image: {
    width: 45,
    height: 45,
    borderRadius: 100,
    padding: 5,
  },
  title: {
    fontFamily: "PromptMedium",
    display: "flex",
    fontSize: 24,
    color: "#373F41",
    padding: 0,
    lineHeight: 30,
    marginTop: 15,
    textAlign: "left",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default AuthorCard;
