import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import CollectionCard from './CollectionCard';
import PoemCard from './PoemCard';

const authorsData = [
  {
    id: 1,
    title: 'Fav poems',
    coverImage: require('../assets/author-images/robert-frost.jpeg'),
    creator: 'ilovecats',
    caption: 'collection 1',
    author: 'author'
  },
  {
    id: 2,
    title: 'Poems of the fall',
    coverImage: require('../assets/author-images/robert-frost.jpeg'),
    creator: 'ilovedietcoke',
    caption: 'collection 2',
    author: 'author',
  },
  {
    id: 3,
    title: 'Fav poems',
    coverImage: require('../assets/author-images/robert-frost.jpeg'),
    creator: 'ilovecats',
    caption: 'collection 1',
    author: 'author',
  },
  {
    id: 4,
    title: 'Poems of the fall',
    coverImage: require('../assets/author-images/robert-frost.jpeg'),
    creator: 'ilovedietcoke',
    caption: 'collection 2',
    author: 'author',
  },
  {
    id: 5,
    title: 'Fav poems',
    coverImage: require('../assets/author-images/robert-frost.jpeg'),
    creator: 'ilovecats',
    caption: 'collection 1',
    author: 'author'
  },
  {
    id: 6,
    title: 'Poems of the fall',
    coverImage: require('../assets/author-images/robert-frost.jpeg'),
    creator: 'ilovedietcoke',
    caption: 'collection 2',
    author: 'author',
  },
];

const TrendingList = () => {
  
    return (
      <View>
        <Text>Trending</Text>
        <FlatList
          data={authorsData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <>
                <CollectionCard coverImage={item.coverImage} title={item.title} creator={item.creator} caption={item.caption} />
            <PoemCard title={item.title} author={item.author} caption={item.caption}/>
            </>
          )}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({

  })

  export default TrendingList;