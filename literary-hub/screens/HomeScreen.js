import { StyleSheet, Text, SafeAreaView, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const [annotationMode, handleAnnotationMode] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text>HomeScreen</Text> 
      <View style={styles.poemContainer}> 
        <Text>Sample Poem</Text>
      </View>

      <View style={styles.userInteractions}>

          {annotationMode ?
            <Pressable onPress={() => {
              handleAnnotationMode(false);
            }}>
              <MaterialCommunityIcons name="toggle-switch" size={24} color="black" />
            </Pressable> :
            <Pressable onPress={() => {
              handleAnnotationMode(true);
            }}><MaterialCommunityIcons name="toggle-switch-off-outline" size={24} color="black" /></Pressable>}
            <Ionicons name="ellipsis-horizontal-outline" size={24} color="black" />

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
    //justifyContent: 'center',
    flexDirection: 'column'
  },

  poemContainer: {
    borderColor:'blue',
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 47,
    width:296, 
    height:603
  },

  userInteractions:{
    paddingHorizontal:30,
    flexDirection: 'row',
    marginLeft: 23,
    marginRight: 23
  }
});