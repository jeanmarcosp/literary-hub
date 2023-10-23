import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (text) => {
    const results = Array.from({ length: 10 }, (_, i) => ({ id: i, name: `Result ${i}` }));
    setSearchResults(results);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        onChangeText={(text) => {
          setSearchText(text);
          handleSearch(text);
        }}
        value={searchText}
        style={styles.textInput}
      />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderRadius: 100,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  resultItem: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    paddingVertical: 8,
  },
});

export default SearchBar;