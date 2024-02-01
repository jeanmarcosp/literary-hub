import React, { useState } from "react";
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const SearchResult = ({data, type}) => {
  const navigation = useNavigation();
  const openItem = () => {
    if (type === 'poem') {
      navigation.navigate('Poem', { poem: data });
    } else  {
      ;
    }

  }; 
  
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={openItem}>
          {type === 'poem' && data && data.title? (
            <>
              <Text>{data.title}</Text>
              <Text style={styles.author}> {data.author}</Text>
            </>
          ) : type === 'user' && data ? (
            // Render user-specific content
            <View style={styles.column}>
            <Image
            source={data.profilePicture ? { uri: data.profilePicture } : require('../assets/collection-images/defaultCover.jpeg')}
            style={styles.image}
          />
            <Text>{data.username}   {data.name}</Text>
            </View>
          ) : (
            // Add more conditions for other types
            <Text></Text>
          )}
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
  column:{
    flexDirection: 'row',
  },
  author:{
    alignItems: "flex-end",

  },
  image:{
    alignItems: 'center',
    height: 20,
    width: 20,
    marginRight: 5,
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