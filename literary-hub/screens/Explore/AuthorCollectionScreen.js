import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import axios from "axios";
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import PoemCard from '../../components/PoemCard';

const AuthorCollectionScreen = () => {

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
    fetchPoemsByAuthor('Isaac Watts');
  }, [])

  excerpt = "hi"

  
  
  return (
    <SafeAreaView style={styles.container}>
      <Text>Titles of Poems:</Text>
      <FlatList
        data={poems}
        keyExtractor={(item) => item._id} 
        renderItem={({ item }) => (
          <PoemCard
              title={item.title}
              excerpt={excerpt}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Set the background color here
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    flex: 1,
    aspectRatio: 2, // Adjust aspect ratio to control the height
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthorCollectionScreen;