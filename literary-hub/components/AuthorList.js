import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import AuthorCard from "./AuthorCard"; 
import axios from "axios";
import { useEffect, useState } from 'react';


const AuthorList = () => {

  const [authors, setAuthors] = useState(null);

  useEffect(() => {
    const fetchAuthors = async() => {
      try {
        const response = await axios.get("http://localhost:3000/trending-authors");
        setAuthors(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAuthors();
  }, [])

  

  return (
    <View>
      <FlatList
        style={styles.authorList}
        data={authors}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <AuthorCard title={item._id} poemCount={item.poemCount}/>
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
