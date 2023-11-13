import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import Like from '../../components/Like';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const CollectionScreen = () => {

  const navigation = useNavigation();

  const Poem = ({ author, title }) => {
    return (
      <View style={styles.poem}>
        <View style={styles.poemInfo}>
          <Text style={styles.poemName}>{title}</Text>
          <Text style={styles.poemAuthor}>{author}</Text>
        </View>
        <Like />
      </View>
    )
  }

  const poemData = [
    {
      id: "1",
      title: 'October',
      author: 'Robert Frost',
      liked: false
    },
    {
      id: "2",
      title: 'Beyond the Red River',
      author: 'Thomas McGrath',
      liked: false
    },
    {
      id: "3",
      title: 'For the Chipmunk in My Yard',
      author: 'Robert Gibb',
      liked: false
    },
  ];

  const PoemList = () => {
    return (
      <FlatList
        data={poemData}
        renderItem={({ item }) => (
          <Poem title={item.title} author={item.author} />
        )}
        keyExtractor={(item) => item.id}
        style={styles.poemList}
      />
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./../../assets/collection-images/fall-collection-image.png')}
        style={styles.image}
        resizeMode="cover"
      >
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <View style={styles.backButton}>
            <Ionicons name="chevron-back" size={23} color="#fff" />
          </View>
        </TouchableOpacity>

        <View style={styles.collectionInfo}>
          <Text style={styles.collectionName}>fall</Text>
          <Text style={styles.collectionAuthor}>@catlady123</Text>
          <Text style={styles.collectionCaption}>my fall 2023 poem collection</Text>
          <View style={styles.likes}>
            <Like />
            <Text style={styles.collectionLikeNumber}>2.5k</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.readButtonWrapper}>
          <View style={styles.readButton}>
            <Text style={styles.readButtonText}>Read</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>

      <PoemList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Set the background color here
  },

  image: {
    position: 'relative',
    width: '100%',
    height: 300,
  },

  backButton: {
    position: 'absolute',
    left: 20,
    top: 40,
    backgroundColor: '#00000080',
    borderRadius: 100,
    alignSelf: 'baseline',
    padding: 5,
  },

  collectionInfo: {
    width: '80%',
    position: 'absolute',
    left: 30,
    bottom: 30,
  },

  collectionName: {
    color: '#fff',
    fontFamily: 'HammersmithOne',
    fontSize: 30,
  },

  collectionAuthor: {
    color: '#fff',
    fontFamily: 'HammersmithOne',
    fontSize: 15,
  },

  collectionCaption: {
    color: '#fff',
    fontFamily: 'Sarabun-Medium',
    fontSize: 15,
  },

  likes: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 7,
  },

  collectionLikeNumber: {
    color: '#fff'
  },

  readButtonWrapper: {
    position: 'absolute',
    right: 30,
    bottom: -17,
  },

  readButton: {
    alignSelf: 'baseline',
    backgroundColor: '#644980',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 100,
  },

  readButtonText: {
    color: '#fff',
    fontFamily: 'HammersmithOne',
    fontSize: 15,
  },

  poemList: {
    marginTop: 20,
  },

  poem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 40,
  },

  poemInfo: {

  },

  poemName: {
    fontFamily: 'HammersmithOne',
    fontSize: 20,
    color: '#373F41'
  },

  poemAuthor: {
    fontFamily: 'Sarabun-Regular',
    fontSize: 15,
    color: '#6C7476'
  }
});

export default CollectionScreen;