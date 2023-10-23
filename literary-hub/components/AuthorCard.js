import 'react-native-gesture-handler'
import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import Like from './Like';
const AuthorCard = ({ coverImage, title }) => {
  return (
    <TouchableOpacity style={styles.card}
    >
      <View style={styles.container}>
        <View style={styles.topRow}>
          <Image 
            source={coverImage}
            style={styles.image} 
          />
          <Like />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
  },
  container: {
    width: 200,
    padding: 15,
    justifyContent: "space-between",
    borderColor: "#373F41",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    padding: 5
  },
  title: {
    fontSize: 15,
    color: "#373F41",
    padding: 5
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default AuthorCard;
