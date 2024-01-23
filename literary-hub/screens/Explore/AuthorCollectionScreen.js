import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import axios from "axios";
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import PoemCard from '../../components/PoemCard';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import Like from '../../components/Like';
import CollectionScreen from '../Explore/Collection'

const AuthorCollectionScreen = ({route}) => {
  const {author} = route.params;

  const [poems, setPoems] = useState(null);

  useEffect(() => {
    const fetchPoemsByAuthor = async(authorName) => {
      try {
        const response = await axios.get(`${ROOT_URL}/author-collection?author=${authorName}`)
        setPoems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPoemsByAuthor(author);
  }, [])

  return (
    <CollectionScreen poems={poems} title={author} showAuthor={false} showCreator={true}/>);
  
  }

export default AuthorCollectionScreen;