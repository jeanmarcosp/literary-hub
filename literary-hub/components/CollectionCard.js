import "react-native-gesture-handler";
import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import Like from "./Like";

const CollectionCard = ({ coverImage, title, caption, creator }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.container}>
        <View style={styles.info}>
          <Image source={coverImage} style={styles.image} />
          <View style={styles.text}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.creator}>{creator}</Text>
            </View>
            <Text style={styles.caption}>{caption}</Text>
          </View>
        </View>
        <Like />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
  },
  container: {
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  text: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    fontFamily: "PromptRegular",
    fontSize: 22,
    color: "#373F41",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  creator: {
    fontFamily: "PromptRegular",
    fontSize: 17,
    color: "gray",
  },
  caption: {
    fontFamily: "PromptRegular",
    fontSize: 15,
    color: "#373F41",
    paddingTop: 10,
  },
});

export default CollectionCard;
