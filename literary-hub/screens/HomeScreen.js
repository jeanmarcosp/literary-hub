import { StyleSheet, Text, SafeAreaView, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


const HomeScreen = () => {
  const [annotationMode, handleAnnotationMode] = useState(false);
  const [liked, handleLike] = useState(false);

  return (
    <SafeAreaView style={styles.container} id='page'>
      <Text>Home Page</Text>
      <View style={styles.poemContainer} id='poem'>
        <Text>Sample Poem</Text>
      </View>

      <View style={styles.userInteractions} id='interactions'>
        <View  >
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
        </View>
        <View style={styles.columnView}>
          {/* This is the third element in the user interactions flexbox */}
          <Feather name="plus" size={24} color="black" />


          {liked ?
            <Pressable onPress={() => {
              handleLike(false);
            }}>
              <FontAwesome name="heart" size={24} color="black" />
            </Pressable> :
            <Pressable onPress={() => {
              handleLike(true);
            }}>
              <FontAwesome name="heart-o" size={24} color="black" />
            </Pressable>

          }
        </View>

      </View>
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
    width: 296,
    height: 603
  },

  userInteractions: {
    width: 344,
    height: 97,
    flexShrink: 0,
    alignItems: 'flex-end',
    gap: 77,
    paddingHorizontal: 30,
    flexDirection: 'row',
    marginLeft: 23,
    marginRight: 23,
    marginBottom: 20,
    marginTop: 20,
  },
  columnView: {
    alignItems: 'flex-end',
    gap: 12,
    flex: 1, // Make the column view occupy the remaining space
    flexDirection: 'column',
  }
});