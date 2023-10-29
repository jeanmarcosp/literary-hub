import { StyleSheet, Text, SafeAreaView, View, Pressable, ScrollView, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const HomeScreen = () => {
  const [annotationMode, handleAnnotationMode] = useState(false);
  const [liked, handleLike] = useState(false);
  const [randomPoem, setRandomPoem] = useState(null);
  const [poemPages, setPoemPages] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const pageWidth = Dimensions.get('window').width; // Get the screen width
  const linesPerPage = 20;

  useEffect(() => {
    axios.get('http://localhost:3000/random-poem')
      .then((response) => {
        setRandomPoem(response.data[0]);
        const lines = response.data[0].content.split('\n'); // split the poem into lines
        //console.log(lines);
        const pages = [];
        let currentPage = '';
        let linesAdded = 0;
  
        for (const line of lines) {
          if (linesAdded >= linesPerPage) {
            pages.push(currentPage);
            currentPage = '';
            linesAdded = 0;
          }
          currentPage += line + '\n';
          linesAdded++;
        }
  
        if (currentPage.length > 0) {
          pages.push(currentPage);
        }
        
        setPoemPages(pages);
        setPageCount(pages.length);
      })
      .catch((error) => {
        console.error('Error fetching random poem:', error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container} id='page'>
      {/* <Text>Home Page</Text> */}
      <View style={styles.poemContainer} id='poem'>
        {randomPoem && (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}  // hide horizontal scrollbar
        >
          {poemPages.map((page, index) => (
            <View key={index} style={styles.page}>
              {index === 0 && (
                <React.Fragment>
                  <Text style={styles.title}>{randomPoem.title}</Text>
                  <Text style={styles.author}>Author: {randomPoem.author}</Text>
                </React.Fragment>
              )}
              <Text style={styles.pageContent}>{page}</Text>
            </View>
          ))}
        </ScrollView>
        )}
      </View>
      <View style={styles.toggle}>
        {annotationMode ?
          <Pressable onPress={() => {
            handleAnnotationMode(false);
          }}>
            <MaterialCommunityIcons name="toggle-switch" size={35} color="black" />
          </Pressable> :
          <Pressable onPress={() => {
            handleAnnotationMode(true);
          }}><MaterialCommunityIcons name="toggle-switch-off-outline" size={35} color="black" /></Pressable>
        }
      </View>
      <View style={styles.userInteractions} id='interactions'>
        {/* <View style={styles.toggle}>
        {annotationMode ?
          <Pressable onPress={() => {
            handleAnnotationMode(false);
          }}>
            <MaterialCommunityIcons name="toggle-switch" size={30} color="black" />
          </Pressable> :
          <Pressable onPress={() => {
            handleAnnotationMode(true);
          }}><MaterialCommunityIcons name="toggle-switch-off-outline" size={30} color="black" /></Pressable>
        }
        </View> */}
        <View style={styles.columnView}>
          {/* This is the third element in the user interactions flexbox */}
          <Feather name="plus" size={30} color="black" />


          {liked ?
            <Pressable onPress={() => {
              handleLike(false);
            }}>
              <FontAwesome name="heart" size={28} color="black" />
            </Pressable> :
            <Pressable onPress={() => {
              handleLike(true);
            }}>
              <FontAwesome name="heart-o" size={28} color="black" />
            </Pressable>

          }
        </View>
        

      </View>
      {/* <Text>Number of Pages: {pageCount}</Text>  */}
      {/* saves page count for when we want to do dots on the bottom */}
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },

  poemContainer: {
    flex: 1,
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  userInteractions: {
    //position: 'absolute',
    //ottom: 40, // Adjust these values to control the button placement
    // width: 344,
    // height: 97,
    // flexShrink: 0,
    // alignItems: 'flex-end',
    // gap: 77,
    // paddingHorizontal: 30,
    // flexDirection: 'row',
    // marginLeft: 23,
    // marginRight: 23,
    // marginBottom: 20,
    // marginTop: 20,
  },

  columnView: {
    //alignItems: 'flex-end',
    gap: 15,
    left: 175,
    flex: 1, // Make the column view occupy the remaining space
    flexDirection: 'column',
    bottom: 40,
    position: 'absolute',
  },

  toggle: {
    //alignItems: 'flex-end',
    flex: 1, // Make the column view occupy the remaining space
    left: 20,
    position: 'absolute',
    bottom: 30,
  },

  page: {
    width: Dimensions.get('window').width,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  pageContent: {
    fontSize: 18,
    lineHeight: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10, // Margin below the title
  },
  
  author: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10, // Margin below the author
  }, 
});