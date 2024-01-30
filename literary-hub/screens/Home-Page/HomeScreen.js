import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useContext, useCallback, useMemo, useRef } from "react";
import Poem from "../../components/Poem.js"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import HomePageLike from "../../components/HomePageLike.js";
import Like from "../../components/Like.js";
import getUserId from "../../hooks/getUserId";
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import CollectionBottomSheet from "../../components/CollectionBottomSheet";
import { setUser } from "../../state/actions/userActions";
import { poemToPage } from '../../hooks/poemActions';

const HomeScreen = () => {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLikedPoems, setUserLikedPoems] = useState([]);
  const userId = getUserId();
  const linesPerPage = 20;
  const [readPoems, setReadPoems] = useState([]);

  const loadMorePoems = async () => {
    if (loading) return;
  
    setLoading(true);
  
    try {
      const response = await axios.get(`${ROOT_URL}/get-poems`, {
        
        params: {
          skip: poems.length, 
          limit: 1,
        },
      });
  
      if (response.data.length === 0) {
        setLoading(false);
        return;
      }

      // filter out previously read poems
      const newPoems = response.data.filter(poem => !readPoems.includes(poem.id));

      poemToPage(newPoems, linesPerPage);
  
      setPoems(prevPoems => [...prevPoems, ...newPoems]);
      setLoading(false);
    } catch (error) {
      console.error('Error loading poems:', error);
      setLoading(false);
    }
  };

  // fetch list of liked poems
  useEffect(() => {
    const fetchLikedPoems = async () => {
      try { 
        const response = await axios.get(`${ROOT_URL}/users/${userId}/likedPoems`);
        console.log("fetched liked poems")
        setUserLikedPoems(response.data); 
      } catch (error) {
        console.error('Error fetching liked poems:', error);
      }
    };

    fetchLikedPoems();
  }, [userId]);

  // fetch list of read poems
  useEffect(() => {
    const fetchReadPoems = async () => {
      try { 
        const response = await axios.get(`${ROOT_URL}/users/${userId}/readPoems`);
        console.log("fetched read poems")
        setReadPoems(response.data); 
      } catch (error) {
        console.error('Error fetching read poems:', error);
      }
    };

    fetchReadPoems();
  }, [userId]);


  useEffect(() => {
    loadMorePoems(); 
  }, [poems]);

  return (
    <View style={styles.container}>
      <ScrollView
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').height}
        snapToAlignment="start"
        decelerationRate="fast"
        onScroll={(event) => {
          const offsetY = event.nativeEvent.contentOffset.y;
          const windowHeight = Dimensions.get('window').height;
          const contentHeight = event.nativeEvent.contentSize.height;
        
          // only load at once at the end of the scroll
          if (offsetY + windowHeight >= contentHeight) {
            loadMorePoems();
          }
        }}
        scrollEventThrottle={30} 
      >

        {poems.map((poem, index) => (
          <Poem 
          key={poem._id || index} 
          poem={poem} 
          poemId={poem._id} 
          userLikedPoems={userLikedPoems}
          route={{params: {poem, poemId: poem._id, userLikedPoems, fromHome:true }}}
          />
        ))}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  poemContainer: {
    height: Dimensions.get('window').height, // Make each poem container the height of the screen
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 30,
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
});

export default HomeScreen;