import "react-native-gesture-handler";
import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import Like from "./Like";

const PoemCard = ({ title, author, caption }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.container}>
        <View style={styles.info}>
          <View style={styles.text}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.author}>{author}</Text>
            </View>
            <Text style={styles.caption}>{caption}</Text>
          </View>
        </View>
        <View style={{flexDirection: "row", alignItems: "center", marginRight:0}}>
          <Like />
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
    backgroundColor: "white",
    borderRadius: 10,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 15,
  },
  title: {
    fontFamily: "PromptRegular",
    fontSize: 22,
    color: "#373F41",
  },
  author: {
    fontFamily: "PromptRegular",
    fontSize: 20,
    padding: 15,
    color: "grey",
  },
  caption: {
    fontFamily: "PromptRegular",
    fontSize: 15,
    color: "#373F41",
    paddingTop: 0,
  },
});

export default PoemCard;
