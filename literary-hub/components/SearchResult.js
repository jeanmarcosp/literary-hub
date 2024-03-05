import React, { useState } from "react";
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import getUserId from "../hooks/getUserId";
import { poemToPage } from '../hooks/poemActions';


const SearchResult = ({data, type}) => {
  const [likedPoems, setUserLikedPoems] = useState([]);
  const navigation = useNavigation();
  const userId = getUserId();
  const openItem = () => {
    if (type === 'poem') {
      //console.log(data);
      const poemData = data.poem ? data.poem : data;
      poemToPage([poemData], 15);
      axios.get(`${ROOT_URL}/users/${userId}/likedPoems`)
      .then((response) => {
        setUserLikedPoems(response.data);
      })
      .catch((error) => {
        console.error("Error finding poem:", error);
      });
      navigation.navigate('SinglePoem', { poem: poemData, poemId: poemData._id, userLikedPoems: likedPoems, fromHome:false });
    } else {
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
    marginRight: 10,
  },

  author:{
    fontFamily: 'Sarabun-Regular',
    fontSize: 14,
    color: '#898B96',
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
    color: '#898B96',
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