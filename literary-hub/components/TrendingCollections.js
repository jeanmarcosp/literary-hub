import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import CollectionCard from "./CollectionCard";
import { useEffect, useState } from 'react';
import axios from "axios";

const collectionData = [
  {
    id: 1,
    title: "Collection 1",
    coverArt: "https://i.pinimg.com/originals/08/90/e2/0890e2a78f1e10a25fbe1e796caf5425.jpg",
    creator: "user 1",
    caption: "collection 1",
  },
  {
    id: 2,
    title: "Collection 2",
    coverArt: "https://i.pinimg.com/originals/08/90/e2/0890e2a78f1e10a25fbe1e796caf5425.jpg",
    creator: "user 2",
    caption: "collection 2",
  },
  {
    id: 3,
    title: "Collection 3",
    coverArt: "https://i.pinimg.com/originals/08/90/e2/0890e2a78f1e10a25fbe1e796caf5425.jpg",
    creator: "user 3",
    caption: "collection 3",
  },
];

const TrendingCollections = () => {
  const [collections, setCollections] = useState(null);

  useEffect(() => {
    const fetchCollections = async() => {
      try {
        const response = await axios.get("http://localhost:3000/trending-collections");
        setCollections(response.data);
        console.log("HELLO", response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCollections();
  }, [])

  const renderItem = ({ item }) => (
    <View>
      <CollectionCard
              coverImage={item.coverArt}
              title={item.title}
              creator={item.user}
              caption={item.caption}
            />
    </View>
  );


  return (
    <View>
      <FlatList
      style={styles.collectionList}
        data={collections}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default TrendingCollections;

const styles = StyleSheet.create({
  collectionList: {
    overflow: 'visible',
    marginTop: 15,
  }
})
