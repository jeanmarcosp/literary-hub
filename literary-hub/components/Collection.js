import 'react-native-gesture-handler'
import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import Like from './Like';

const Collection = ({ collection }) => {
  return (
    <Text>Main poem page</Text>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
  },
  container: {
    padding: 5,
    justifyContent: "space-between",
    borderColor: "#373F41",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  text: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: "#373F41",
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 10,
    padding: 20,
  },
  creator: {
    fontSize: 15,
    color: "#373F41",
  },
  caption: {
    fontSize: 15,
    color: "#373F41",
    paddingTop: 15
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default Collection;
