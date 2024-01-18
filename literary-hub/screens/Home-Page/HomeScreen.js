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
import Poem from "./Poem.js"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import Like from "../../components/Like";
import getUserId from "../../hooks/getUserId";
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import CollectionBottomSheet from "../../components/CollectionBottomSheet";
import { setUser } from "../../state/actions/userActions";

const HomeScreen = () => {
  const [poems, setPoems] = useState([]);
  const [currentPoemIndex, setCurrentPoemIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);

  const linesPerPage = 20;

  const loadMorePoems = async () => {
    if (loading) return;
  
    setLoading(true);
  
    try {
      const response = await axios.get(`${ROOT_URL}/get-poems`, {
        
        params: {
          skip: poems.length, // Update the skip parameter
          limit: 1,
        },
      });
  
      if (response.data.length === 0) {
        // No more poems available
        setLoading(false);
        return;
      }
  
      // Split the poem into pages
      const lines = response.data[0].content.split("\n");
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
  
      // Update the state with the poem and its pages
      setPoems((prevPoems) => [...prevPoems, { ...response.data[0], pages }]);
      setLoading(false);
    } catch (error) {
      console.error('Error loading poems:', error);
      setLoading(false);
    }
  };

  
  

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
          <Poem key={index} poem={poem} /> // Use the Poem component
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