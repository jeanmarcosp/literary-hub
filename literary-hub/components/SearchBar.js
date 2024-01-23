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
      .get("http://localhost:3000/search", {
        params: { query: searchText },
      })
      .then((response) => {
        setSearchResults(response.data);
        console.log("response.data: ", response.data);
        onSearch(response.data);
      })
      .catch((error) => {
        console.log("Error fetching search results from search bar");
      });
  };

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={24} color="gray" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search poems, collections, and authors"
        value={searchText}
        onChangeText={(text) => handleSearch(text)}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 7,
    paddingHorizontal: 10,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    padding: 0,
  },
});

export default SearchBar;