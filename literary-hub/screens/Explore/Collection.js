import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CollectionScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Set the background color here
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CollectionScreen;