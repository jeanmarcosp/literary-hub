// Poem.js
import CollectionBottomSheet from "../components/CollectionBottomSheet";
import { View, ScrollView, Text, Dimensions, StyleSheet, Pressable, ImageBackground } from 'react-native';
import React, { useState, useEffect, useContext, useCallback, useMemo, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import HomePageLike from "./HomePageLike";
import { markPoemAsRead, handleDislike, handleLike } from "../hooks/poemActions";
import getUserId from "../hooks/getUserId";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Poem = ({ route }) => {
  const {poem, poemId, userLikedPoems, fromHome, collection} = route.params || {};
  const navigation = useNavigation();
  const [annotationMode, handleAnnotationMode] = useState(false);
  // const [liked, handleLike] = useState(false);
  const bottomSheetRef = useRef(null);
  const READ_TIMER_DURATION = 5000;
  const [isRead, setIsRead] = useState(false);
  const isInitiallyLiked = userLikedPoems.includes(poemId);
  const userId = getUserId();

  // if poem is already marked as read, do nothing
  // if it isn't, mark it as read
  useEffect(() => {
    if (isRead) return; 

    const timer = setTimeout(() => {
      if (true) {
        markPoemAsRead(userId, poemId);  
        setIsRead(true); 
      }
    }, READ_TIMER_DURATION);

    return () => clearTimeout(timer); 
  }, [poemId, isRead]);

	const handleClosePress = () => {
    bottomSheetRef.current?.close();
  }
	const handleOpenPress = () => {
    bottomSheetRef.current?.expand();
  };
  return (
    <View>
    {collection && (  
      <ImageBackground
      source={collection.coverArt ? { uri: collection.coverArt } : require('../assets/collection-images/defaultCover.jpeg')}
      style={styles.image}
      resizeMode="cover"
    >
      {!fromHome && (  
        <TouchableOpacity
          style={styles.bannerContainer}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
          <Text style={styles.collectionTitle}>{collection.title}</Text>
        </TouchableOpacity>
      )}
    </ImageBackground>
    )}
    <View style={styles.poemContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={Dimensions.get('window').width}
      >
        {poem.pages.map((page, index) => (
          <View key={index} style={styles.page}>
            {index === 0 && (
              <React.Fragment>
                <Text style={styles.title}>{poem.title}</Text>
                <Text style={styles.author}>
                  Author: {poem.author}
                </Text>
              </React.Fragment>
            )}
            <Text style={styles.pageContent}>{page}</Text>
          </View>
        ))}
      </ScrollView>
      

      <HomePageLike 
        inLikes={isInitiallyLiked} 
        handleLike={() => handleLike(userId, poemId)} 
        handleDislike={() => handleDislike(userId, poemId)}
      />

      <View style={styles.toggle}>
        {annotationMode ? (
          <Pressable
            onPress={() => {
              handleAnnotationMode(false);
            }}
          >
            <MaterialCommunityIcons
              name="toggle-switch"
              size={35}
              color="#644980"
            />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              handleAnnotationMode(true);
            }}
          >
            <MaterialCommunityIcons
              name="toggle-switch-off-outline"
              size={35}
              color="#644980"
            />
          </Pressable>
        )}
      </View>
      <View style={styles.plus}>
        <Pressable onPress={handleOpenPress} style={styles.icon}>
          <Feather name="plus" size={30} color="#644980" />
        </Pressable>
      </View>
      {/* <View style={styles.heart}>
        <Like />
      </View> */}

      
      <CollectionBottomSheet ref={bottomSheetRef} title="Add to Collection" poem={poem} />
    </View>
    </View>
    
  );
};
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  poemContainer: {
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 30,
    position: "relative",
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  page: {
    width: Dimensions.get('window').width,
    paddingTop: 50,
  },
  pageContent: {
    fontSize: 18,
    lineHeight: 24,
  },
  toggle: {
    position: "absolute",
    left: screenWidth * 0.05, 
    bottom: screenHeight * 0.1, 
  },
  heart: {
    position: "absolute",
    right: screenWidth * 0.045, 
    bottom: screenHeight * 0.1, 
  },
  plus: {
    position: "absolute",
    right: screenWidth * 0.05, 
    bottom: screenHeight * 0.15, 
  },
  bottomSheet: {
    flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: '#00000080',
    borderRadius: 100,
    padding: 5,
  },
  image: {
    position: 'relative',
    width: '100%',
    height: 100,
    alignItems: 'left',
  },
  collectionTitle: {
    color: "white",
    fontFamily: 'HammersmithOne',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: "center",
  },
  bannerContainer: {
    flexDirection: "row", // Align items in a row
    alignItems: "center", // Center items vertically
    paddingHorizontal: 20, // Adjust as needed
    paddingVertical: 30, // Adjust as needed
    top: 30,
  },
});

export default Poem;
