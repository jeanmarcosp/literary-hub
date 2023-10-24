import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import CollectionCard from "./CollectionCard";
import PoemCard from "./PoemCard";

const authorsData = [
  {
    id: 1,
    title: "Fav poems 1",
    coverImage: require("../assets/collection-images/sky.jpg"),
    creator: "ilovecats",
    caption: "collection 1",
    author: "author",
  },
  {
    id: 2,
    title: "Poems of the fall 2",
    coverImage: require("../assets/collection-images/sky.jpg"),
    creator: "ilovedietcoke",
    caption: "collection 2",
    author: "author",
  },
  {
    id: 3,
    title: "Fav poems 3",
    coverImage: require("../assets/collection-images/sky.jpg"),
    creator: "ilovecats",
    caption: "collection 1",
    author: "author",
  },
  {
    id: 4,
    title: "Poems of the fall 4",
    coverImage: require("../assets/collection-images/sky.jpg"),
    creator: "ilovedietcoke",
    caption: "collection 2",
    author: "author",
  },
  {
    id: 5,
    title: "Fav poems 5",
    coverImage: require("../assets/collection-images/sky.jpg"),
    creator: "ilovecats",
    caption: "collection 1",
    author: "author",
  },
  {
    id: 6,
    title: "Poems of the fall 6",
    coverImage: require("../assets/collection-images/sky.jpg"),
    creator: "ilovedietcoke",
    caption: "collection 2",
    author: "author",
  },
];

const TrendingList = () => {
  return (
    <View>
      <FlatList
        data={authorsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <>
            <CollectionCard
              coverImage={item.coverImage}
              title={item.title}
              creator={item.creator}
              caption={item.caption}
            />
            <PoemCard
              title={item.title}
              author={item.author}
              caption={item.caption}
            />
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default TrendingList;
