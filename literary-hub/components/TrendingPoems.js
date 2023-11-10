import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import PoemCard from "./PoemCard";

const poemData = [
  {
    id: 1,
    title: "October",
    excerpt: "O hushed October morning mild, Thy leaves have ripened to the fall",
    author: "Robert Frost",
  },
  {
    id: 2,
    title: "The Weary Blues",
    excerpt: "Droning a drowsy syncopated tune, Rocking back and forth to a mellow croon,",
    author: "Langston Hughes",
  },
  {
    id: 3,
    title: "Morning in the Burned House",
    excerpt: "In the burned house I am eating breakfast. You understand: there is no house, there is no breakfast,",
    author: "Margaret Atwood",
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
