import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import PoemCard from "./PoemCard";

const poemData = [
  {
    id: 1,
    title: "October",
    excerpt: "O hushed October morning mild,",
    author: "Robert Frost",
  },
  {
    id: 2,
    title: "October",
    excerpt: "O hushed October morning mild, Thy leaves have ripened to the fall;",
    author: "Robert Frost",
  },
  {
    id: 3,
    title: "October",
    excerpt: "O hushed October morning mild,",
    author: "Robert Frost",
  },
];

const TrendingPoems = () => {
  return (
    <View>
      <FlatList
        style={styles.poemList}
        data={poemData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <>
            <PoemCard
              title={item.title}
              author={item.author}
              excerpt={item.excerpt}
            />
          </>
        )}
      />
    </View>
  );
};

export default TrendingPoems;

const styles = StyleSheet.create({
  poemList: {
    overflow: 'visible',
    marginTop: 15,
  }
})
