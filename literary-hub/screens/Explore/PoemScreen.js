// PoemScreen.js
import React from "react";
import { View, Text, StyleSheet, Button, Dimensions, ScrollView, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";

const PoemScreen = ({ route, navigation}) => {
  const { title, author, content } = route.params;
  console.log("route params", title)

  // Fetch poem content based on poemId or use the content passed from the search results

  const poemContent = "Your poem content goes here...";

  return (
    <View style={styles.poemContainer}>

    
    <ScrollView
        vertical
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={Dimensions.get('window').length}
      >
        {/* {poem.pages.map((page, index) => (
          <View key={index} style={styles.page}>
            {index === 0 && (
              <React.Fragment>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.author}>
                  Author: {author}
                </Text>
              </React.Fragment>
            )}
            <Text style={styles.pageContent}>{page}</Text>
          </View>
        ))} */}
        
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.author}>
              Author: {author}
            </Text>
            <Text style={styles.pageContent}>{content}</Text>          
      <Button title="Go Back" onPress={() => navigation.goBack()} /> 
      </ScrollView>
      


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

export default PoemScreen;
