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

const AuthorCollectionScreen = ({route}) => {
  const navigation = useNavigation();
  const {author} = route.params;
  
  console.log("MY AUTHOR", author);

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

  excerpt = "hi"


  const Poem = ({ author, title }) => {
    return (
      <View style={styles.poem}>
        <View style={styles.poemInfo}>
          <Text style={styles.poemAuthor}>{title}</Text>
        </View>
        <Like />
      </View>
    )
  }

  const PoemList = () => {
    return (
      <FlatList
        data={poems}
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
          <Text style={styles.collectionName}>{author}</Text>
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

export default AuthorCollectionScreen;