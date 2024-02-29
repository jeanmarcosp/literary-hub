import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import axios from "axios";
import { useEffect, useState } from 'react';
import AuthorCard from "./AuthorCard";

const AuthorList = () => {

  const [collections, setCollections] = useState([]);
  const fetchAuthors = async() => {
    try {
      // called at beginning to create author collections
      // await axios.get(`${ROOT_URL}/create-author-collections`);
      
      // grab 6 collections
      const response = await axios.get(`${ROOT_URL}/explore-authors`);
      setCollections(response.data.extractedCollections)
    } catch (error) {
      console.error(error);
    }
  };

  // once you choose the 6 authors using fetchAuthors, refresh for those 6
  const handleRefresh = async() => {
    const collectionIdsToFetch = collections.map(collection=>collection._id)

    try {
      const response = await axios.get(`${ROOT_URL}/collections-by-ids`, {
        params: {
          collectionIds: collectionIdsToFetch,
        },
      })
      setCollections(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  // gets authors with more than 10 poems in db
  useEffect(() => {
    fetchAuthors();
  }, [])

  const renderItem = ({ item }) => {
    return (
      <View>
        <AuthorCard
                collection={item}
                handleRefresh={handleRefresh}
              />
      </View>
    );
  }

  return (
    <View>
    
      <FlatList
        style={styles.container}
        data={collections}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
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


