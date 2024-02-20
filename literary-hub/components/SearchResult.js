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
            <View style={styles.poemResult}>
              <Ionicons name="book-outline" size={20} color="#658049" />
              <View>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.author}>by {data.author}</Text>
              </View>
            </View>
          ) : type === 'user' && data ? (
            // Render user-specific content
            <View style={styles.userResult}>
              <Image
                source={data.profilePicture ? { uri: data.profilePicture } : require('../assets/collection-images/defaultCover.jpeg')}
                style={styles.image}
              />
              <View style={styles.names}>
                <Text style={styles.name}>{data.name}</Text>
                <Text style={styles.username}>@{data.username}</Text>
              </View>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F6F5F8',
  },

  poemResult: {
    flexDirection: 'row',
    columnGap: 10,
  },

  userResult:{
    flexDirection: 'row',
    columnGap: 10,
  },

  title: {
    fontFamily: 'Sarabun-Bold',
    fontSize: 16,
    color: '#3D3D3D',
  },

  author:{
    fontFamily: 'Sarabun-Regular',
    fontSize: 14,
    color: '#9C9FAB',
  },

  image:{
    alignItems: 'center',
    height: 40,
    width: 40,
    marginRight: 5,
    borderRadius: 100,
  },

  names: {
    flexDirection: 'column',
  },

  name: {
    fontFamily: 'Sarabun-Bold',
    fontSize: 16,
    color: '#3D3D3D',
  },

  username: {
    fontFamily: 'Sarabun-Regular',
    fontSize: 14,
    color: '#9C9FAB',
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