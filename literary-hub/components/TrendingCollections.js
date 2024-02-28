import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import CollectionCard from "./CollectionCard";
import { useEffect, useState } from 'react';
import axios from "axios";
import AuthorCard from "./AuthorCard";

const TrendingCollections = () => {
  const [collections, setCollections] = useState([]);
  const fetchCollections = async() => {
    try {
      const response = await axios.get(`${ROOT_URL}/trending-collections`);
      setCollections(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [])

  const renderItem = ({ item }) => (
    <View>
      <CollectionCard
              collection={item}
              handleRefresh={fetchCollections}
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
