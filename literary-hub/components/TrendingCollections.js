import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import CollectionCard from "./CollectionCard";
import { useEffect, useState } from 'react';
import axios from "axios";

const TrendingCollections = () => {
  const [collections, setCollections] = useState(null);

  useEffect(() => {
    const fetchCollections = async() => {
      try {
        const response = await axios.get("http://localhost:3000/trending-collections");
        setCollections(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCollections();
  }, [])

  const renderItem = ({ item }) => (
    <View>
      <CollectionCard
              collection={item}
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
