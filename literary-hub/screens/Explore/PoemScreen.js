// PoemScreen.js
import React from "react";
import { View, Text, StyleSheet, Button, Dimensions, ScrollView, Pressable , SafeAreaView} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

const PoemScreen = ({ route, navigation}) => {
  const { poem } = route.params;

   // split the poem into pages
   const linesPerPage = 17;
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
  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Pressable style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>
      
      </View>
      <View style={styles.poemContainer}>
        <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={Dimensions.get('window').width}
      >
        {pages.map((page, index) => (
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
      


    </View>
    </View>
  );
};
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header:{
    marginTop: 50,
    marginLeft:15,
    position:'absolute',
  },
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

export default PoemScreen;
