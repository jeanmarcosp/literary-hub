// Poem.js
import CollectionBottomSheet from "../components/CollectionBottomSheet";
import { View, ScrollView, Text, Dimensions, StyleSheet, Pressable } from 'react-native';
import React, { useState, useEffect, useContext, useCallback, useMemo, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import HomePageLike from "./HomePageLike";

const Poem = ({ poem, poemId, onRead, onLike, onUnlike, userLikedPoems }) => {
  const [annotationMode, handleAnnotationMode] = useState(false);
  const [liked, handleLike] = useState(false);
  const bottomSheetRef = useRef(null);
  const READ_TIMER_DURATION = 5000;
  const [isRead, setIsRead] = useState(false);
  const isInitiallyLiked = userLikedPoems.includes(poemId);

  // if poem is already marked as read, do nothing
  // if it isn't, mark it as read
  useEffect(() => {
    if (isRead) return; 

    const timer = setTimeout(() => {
      if (onRead) {
        onRead(poemId);  
        setIsRead(true); 
      }
    }, READ_TIMER_DURATION);

    return () => clearTimeout(timer); 
  }, [poemId, onRead, isRead]);

	const handleClosePress = () => {
    bottomSheetRef.current?.close();
  }
	const handleOpenPress = () => {
    bottomSheetRef.current?.expand();
  };

  
  return (
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
        handleLike={() => onLike(poemId)} 
        handleDislike={() => onUnlike(poemId)}
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
    paddingTop: 30,
    paddingBottom: 30,
    position: "relative",
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
});

export default Poem;
