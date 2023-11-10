import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import AuthorCard from "./AuthorCard"; 

const authorsData = [
  {
    id: 1,
    title: "Robert Frost",
    coverImage: require("../assets/author-images/robert-frost.jpg.webp"),
  },
  {
    id: 2,
    title: "Margaret Atwood",
    coverImage: require("../assets/author-images/margaret-atwood.jpg"),
  },
  {
    id: 3,
    title: "Emily Dickinson",
    coverImage: require("../assets/author-images/emily-dick.webp"),
  },
];

const AuthorList = () => {
  return (
    <View>
      <FlatList
        style={styles.authorList}
        data={authorsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AuthorCard coverImage={item.coverImage} title={item.title} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default AuthorList;

const styles = StyleSheet.create({
  authorList: {
    overflow: 'visible'
  }
})
