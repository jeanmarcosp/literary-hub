import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import AuthorCard from "./AuthorCard"; 
import axios from "axios";
import { useEffect, useState } from 'react';


const AuthorList = () => {

  const [collections, setCollections] = useState(null);

  // gets authors with more than 10 poems in db
  useEffect(() => {
    const fetchAuthors = async() => {
      try {
        // called at beginning to create author collections
        // await axios.get("http://localhost:3000/create-author-collections");
        
        // grab 10 collections
        const response = await axios.get("http://localhost:3000/explore-authors");
        setCollections(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchAuthors();
  }, [])
  
  console.log("MY 10 AUTHOR COLLECTIONS", collections);
  return (
    <View>
      <FlatList
        style={styles.authorList}
        data={collections}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <AuthorCard collection={item}/>
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
