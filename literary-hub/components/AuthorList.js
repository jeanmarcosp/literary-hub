import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import axios from "axios";
import { useEffect, useState } from 'react';
import CollectionCard from "./CollectionCard";
import AuthorCard from "./AuthorCard";

const AuthorList = () => {

  const [collections, setCollections] = useState([]);

  // gets authors with more than 10 poems in db
  useEffect(() => {
    const fetchAuthors = async() => {
      try {
        // called at beginning to create author collections
        // await axios.get("http://localhost:3000/create-author-collections");
        
        // grab 6 collections
        const response = await axios.get("http://localhost:3000/explore-authors");
        setCollections(response.data.extractedCollections)
        console.log("peter3" , response.data.extractedCollections)
      } catch (error) {
        console.error(error);
      }
    };
    fetchAuthors();
  }, [])

  const renderItem = ({ item }) => {
    console.log("im in render")
    return (
      <View>
        <AuthorCard
                collection={item}
              />
      </View>
    );
  }

  return (
    //  
    // <View style={styles.container}>
    //   {collections &&
    //     collections.map((item, index) => (
    //       <View key={index}>
    //         <AuthorCard collection={item} />
    //       </View>
    //     ))}
    // </View>
    <View>
    
      <FlatList
        style={styles.container}
        data={collections}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={true}
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


