import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, FlatList, Dimensions } from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
  const [randomPoem, setRandomPoem] = useState(null);
  const [poemPages, setPoemPages] = useState([]);

  const pageWidth = Dimensions.get('window').width; // Get the screen width
  const linesPerPage = 20;

  useEffect(() => {
    axios.get('http://localhost:3000/random-poem')
      .then((response) => {
        setRandomPoem(response.data[0]);
        const lines = response.data[0].content.split('\n'); // Split the poem into lines
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
      })
      .catch((error) => {
        console.error('Error fetching random poem:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="rgba(0, 0, 0, 0.2)"
        barStyle="dark-content"
      />
      
      {randomPoem && (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  page: {
    width: Dimensions.get('window').width,
    paddingTop: 100,
    paddingHorizontal: 16,
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
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

export default HomeScreen;
