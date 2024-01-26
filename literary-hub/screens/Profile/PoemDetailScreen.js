import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PoemDetailScreen = ({ route }) => {
  const { poem } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{poem.title}</Text>
        <Text style={styles.author}>By {poem.author}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.poemText}>{poem.content}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  author: {
    fontSize: 18,
    fontStyle: 'italic',
    color: 'grey',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  poemText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
});

export default PoemDetailScreen;
