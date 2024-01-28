import CollectionBottomSheet from "../../components/CollectionBottomSheet";
import { View, ScrollView, Text, Dimensions, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext, useCallback, useMemo, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import HomePageLike from "../../components/HomePageLike";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import getUserId from "../../hooks/getUserId";
import axios from "axios";

const PoemDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const [annotationMode, handleAnnotationMode] = useState(false);
  const { poem, isLiked } = route.params; // Retrieve isLiked from route params
  const [liked, setLiked] = useState(isLiked);
  const bottomSheetRef = useRef(null);
  const [userLikedPoems, setUserLikedPoems] = useState([]);
  const userId = getUserId();
  const [processedPoem, setProcessedPoem] = useState(null); // State to hold processed poem
  const linesPerPage = 20;

  useEffect(() => {
    if (poem && poem.content) {
      const lines = poem.content.split("\n");
      const pages = [];
      let currentPage = "";
      let linesAdded = 0;

      for (const line of lines) {
        if (linesAdded >= linesPerPage) {
          pages.push(currentPage);
          currentPage = "";
          linesAdded = 0;
        }
        currentPage += line + "\n";
        linesAdded++;
      }

      if (currentPage.length > 0) {
        pages.push(currentPage);
      }

      setProcessedPoem({ ...poem, pages }); 
    }
  }, [poem]);

  const onLike = async (poemId) => {
    try {
      await axios.put(`${ROOT_URL}/poems/${poemId}/${userId}/like`);

    } catch (error) {
      console.error('Error liking poem:', error);
    }
  };
  
  const onUnlike = async (poemId) => {
    try {
      await axios.put(`${ROOT_URL}/poems/${poemId}/${userId}/unlike`);
      
    } catch (error) {
      console.error('Error unliking poem:', error);
    }
  };
  
	const handleClosePress = () => {
    bottomSheetRef.current?.close();
  }
	const handleOpenPress = () => {
    bottomSheetRef.current?.expand();
  };

  const goBack = () => {
    console.log("Back button pressed");
    navigation.goBack();
  };

  useEffect(() => {
    const fetchLikedPoems = async () => {
      try {
        const response = await axios.get(`${ROOT_URL}/users/${userId}/likedPoems`);
        setUserLikedPoems(response.data);
      } catch (error) {
        console.error('Error fetching liked poems:', error);
      }
    };
  
    fetchLikedPoems();
  }, [userId]);

  const isInitiallyLiked = userLikedPoems.includes(poem._id);
  //onPress={goBack}
  //onPress={() => navigation.goBack()}
  return (

    <View style={styles.poemContainer}>
      {/* <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Ionicons name="arrow-back" size={30} color="#644980" onPress={goBack}/>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={goBack} style={{ marginRight: 350, marginTop: 30 }}>
        <Ionicons name="arrow-back" size={50} color="#644980" />
      </TouchableOpacity>

      
      {processedPoem && processedPoem.pages ? (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={Dimensions.get('window').width}
        >
          {processedPoem.pages.map((page, index) => (
              <View key={index} style={styles.page}>
                {index === 0 && (
                  <React.Fragment>
                    <Text style={styles.title}>{processedPoem.title}</Text>
                    <Text style={styles.author}>
                      Author: {processedPoem.author}
                    </Text>
                  </React.Fragment>
                )}
                <Text style={styles.pageContent}>{page}</Text>
              </View>
          ))}
        </ScrollView>
      ) : (
        <Text>Loading poem...</Text>  
      )}

      <HomePageLike 
        inLikes={liked} 
        handleLike={() => {
          onLike(poem._id);
          setLiked(true);
        }} 
        handleDislike={() => {
          onUnlike(poem._id);
          setLiked(false); 
        }}
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
    paddingTop: 20,
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
    position: "absolute",
    left: screenWidth * 0.05,
  },
});

export default PoemDetailScreen;


