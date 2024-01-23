import React, { useState } from "react";
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const SearchResult = ({title, author}) => {


  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={openPoem}>
        <Text>{title}     {author}</Text>
        </TouchableOpacity> 
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

export default SearchResult;