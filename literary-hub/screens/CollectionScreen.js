import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import Like from '../components/Like';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import getUserId from '../hooks/getUserId';
import { poemToPage } from '../hooks/poemActions';
import PoemList from '../components/PoemList';
import { handleLike, handleDislike } from '../hooks/poemActions';

// const CollectionScreen = ({poems, title, showAuthor = true, showCreator = true}) => {
const CollectionScreen = ({ route }) => {
  const { collection } = route.params;
  const navigation = useNavigation();
  const hasAuthor = collection.username != undefined;
  const userId = getUserId();
  const userIsCreator = collection.user === userId;
  
  const poemIds = collection.poemsInCollection;
  const collectionId = collection._id;

  // fetch poems by the IDs in poemIds
  const [poems, setPoems] = useState([])
  const [userLikedPoems, setUserLikedPoems] = useState([]);

  const fetchPoems = async() => {
    try {
      const response = await axios.get(`${ROOT_URL}/poems-by-ids`, {
        params: {
          poemIds: poemIds,
        },
      });
      setPoems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLikedPoems = async () => {
    try { 
      const response = await axios.get(`${ROOT_URL}/users/${userId}/likedPoems`);
      setUserLikedPoems(response.data); 
    } catch (error) {
      console.error('Error fetching liked poems:', error);
    }
  };

  useEffect(() => {
    fetchPoems();
    fetchLikedPoems();
  }, [])

  if (poems) {
    poemToPage(poems, 20);
  }

  const navigateToSinglePoem = (poem, poemId, userLikedPoems ) => {
    navigation.navigate('SinglePoem', { poem, poemId, userLikedPoems, fromHome:false, collection }); 
  };

  const PoemName = ({poem, poemId, userLikedPoems}) => {
    return (
      <TouchableOpacity onPress={() => navigateToSinglePoem(poem, poemId, userLikedPoems)}>
        <View style={styles.poem}>
          <View style={styles.poemInfo}>
            <Text style={styles.poemName}>{poem.title}</Text>
            <Text style={styles.poemAuthor}>{poem.author}</Text>
          </View>
          <Like 
            inLikes={userLikedPoems.includes(poemId)}
            handleLike={() => handleLike(userId, poemId, () => fetchPoems)}
            handleDislike={() => handleDislike(userId, poemId, () => fetchPoems)}
          />
        </View>
      </TouchableOpacity>
      
    )
  }

  const PoemList = ({userLikedPoems}) => {
    return (
      <FlatList
        data={poems}
        renderItem={({ item }) => (
          <PoemName poem={item} poemId= {item._id} userLikedPoems={userLikedPoems}/>
        )}
        keyExtractor={(item) => item.id}
        style={styles.poemList}
      />
    );
  };

  const handleEditCollection = () => {
    navigation.navigate("EditCollectionScreen", { collection })
  }

  const handleLikeCollection = async () => {
    try {
      await axios.put(`${ROOT_URL}/collections/${collectionId}/${userId}/like`);
    } catch (error) {
      console.error("Error liking collection:", error);
    }
  };

  const handleUnlikeCollection = async () => {
    try {
      await axios.put(`${ROOT_URL}/collections/${collectionId}/${userId}/unlike`);
    } catch (error) {
      console.error("Error unliking collection:", error);

    }
  };
  
  return (
    <View style={styles.container}>
      <ImageBackground
        source={collection.coverArt ? { uri: collection.coverArt } : require('literary-hub/assets/collection-images/defaultCover.jpeg')}
        style={styles.image}
        resizeMode="cover"
      >
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <View style={styles.backButton}>
            <Ionicons name="chevron-back" size={23} color="white" />
          </View>
        </TouchableOpacity>

        <View style={styles.collectionInfo}>
          <Text style={styles.collectionName}>{collection.title}</Text>
          {hasAuthor && (
            <Text style={styles.collectionAuthor}>@{collection.username}</Text>
            )}
          <View style={styles.options}>
            <View style={styles.likes}>
              <Like
                inLikes={collection.likes.includes(userId)}
                handleLike={handleLikeCollection}
                handleDislike={handleUnlikeCollection}
              />
              <Text style={styles.collectionLikeNumber}>{collection.likes.length}</Text>
            </View>
            {hasAuthor && userIsCreator && (
              <Ionicons name="create" size={24} color="white" onPress={handleEditCollection}/>
            )}
            
          </View>
          
        </View>

        <TouchableOpacity style={styles.readButtonWrapper}>
          <View style={styles.readButton}>
            <Text style={styles.readButtonText}>Read</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>

      <PoemList userLikedPoems={userLikedPoems}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
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
    marginTop: 25,
    paddingHorizontal: 40,
  },

  poemInfo: {

  },

  poemName: {
    fontFamily: 'HammersmithOne',
    fontSize: 17,
    color: '#373F41'
  },

  poemAuthor: {
    fontFamily: 'Sarabun-Regular',
    fontSize: 15,
    color: '#6C7476'
  },
  options: {
    flexDirection: 'row',
    columnGap: 15,
    alignItems: 'center',
  }
});

export default CollectionScreen;