import React, { useState } from "react";
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const SearchResult = ({Poem}) => {
  const navigation = useNavigation();
  const openPoem = () =>{
    //event.persist();
    //navigation.navigate("Poem", { title, author, content });
    navigation.navigate('Poem', { title: Poem.title, author:Poem. author, content: Poem.content });

  }

  return (
    <View style={styles.container}>
       <TouchableOpacity
       onPress={openPoem}
       >
        <Text>{Poem.title}</Text><Text style={styles.author}>     {Poem.author}</Text>
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
  author:{
    alignItems: "flex-end",

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