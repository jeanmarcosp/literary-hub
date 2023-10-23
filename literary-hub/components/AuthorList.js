import React from 'react';
import { View, FlatList, Text } from 'react-native';
import AuthorCard from './AuthorCard'; // Assuming you have a separate file for the AuthorCard component

const authorsData = [
  {
    id: 1,
    title: 'Robert Frost',
    coverImage: require('../assets/author-images/robert-frost.jpeg'),
  },
  {
    id: 2,
    title: 'Robert Frost',
    coverImage: require('../assets/author-images/robert-frost.jpeg'),
  },
  // Add more author data items as needed
];

const AuthorList = () => {

    return (
      <View>
      <Text>Author Collections</Text>
        <FlatList
          data={authorsData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <AuthorCard coverImage={item.coverImage} title={item.title} />
          )}
          
          horizontal
        />
      </View>
    );
  };
  
  export default AuthorList;