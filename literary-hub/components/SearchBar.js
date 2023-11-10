import React, { useState } from "react";
import { View, TextInput, FlatList, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (text) => {
    const results = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      name: `Result ${i}`,
    }));
    setSearchResults(results);
  };

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={24} color="gray" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search poems, collections, and authors"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
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