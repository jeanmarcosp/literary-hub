import React, { useState } from "react";
import { View, TextInput, FlatList, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const SearchBar = ({onSearch}) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);



  const handleSearch = (text) => {
    setSearchText(text);
    getResults();
  };
  const getResults = () => {
    axios
      .get(`${ROOT_URL}/search`, { 
        params: { query: searchText },
      })
      .then((response) => {
        setSearchResults(response.data);
        console.log("response.data: ", response.data);
        onSearch(response.data);
      })
      .catch((error) => {
        console.log("Error fetching search results from search bar", error);
      });
  };

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#888888" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search poems, collections, and authors"
        placeholderTextColor="#888888"
        value={searchText}
        onChangeText={(text) => handleSearch(text)}
        onBlur={()=> setSearchResults([])}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 10,
  },

  icon: {
    marginLeft: 10,
    marginRight: 10,
  },

  input: {
    flex: 1,
    height: 40,
    padding: 0,
    fontFamily: 'Sarabun-Medium',
    fontSize: 15,
  },
});

export default SearchBar;