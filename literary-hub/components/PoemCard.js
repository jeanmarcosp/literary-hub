import "react-native-gesture-handler";
import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import Like from "./Like";
import { Ionicons } from "@expo/vector-icons";

const PoemCard = ({ title, author, excerpt }) => {
  console.log(excerpt.split('\n').slice(0, 2).join('\n'))
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.container}>
        <View style={styles.info}>
          <View style={styles.text}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.author}>{author}</Text>
              <Like />
            </View>
            <Text style={styles.excerpt}>{excerpt.split('\n').slice(0, 2).join('\n')}</Text>
          </View>
          <TouchableOpacity>
            <View style={styles.viewPoem}>
              <Text style={styles.viewPoemText}>View poem</Text>
              <Ionicons name="chevron-forward" size={17} color="black" />
            </View>
          </TouchableOpacity>
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
    paddingHorizontal: 18,
    paddingVertical: 18,
    backgroundColor: "white",
    borderRadius: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
  info: {
    marginBottom: 0,
  },
  text: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Sarabun-Bold",
    fontSize: 22,
    color: "#373F41",
  },
  author: {
    fontFamily: "Sarabun-Regular",
    fontSize: 15,
    paddingHorizontal: 25,
    color: "grey",
  },
  excerpt: {
    fontFamily: "Sarabun-Regular",
    fontSize: 16,
    color: "#373F41",
    marginTop: 10,
  },
  viewPoem: {
    flexDirection: "row",
    marginTop: 10,
  },
  viewPoemText: {
    fontFamily: "HammersmithOne",
    fontSize: 13,
    color: "#373F41",
  },
});

export default PoemCard;
