import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Like from '../../components/Like';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const CollectionScreen = () => {

  const navigation = useNavigation();

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
      </ImageBackground>
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

  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CollectionScreen;