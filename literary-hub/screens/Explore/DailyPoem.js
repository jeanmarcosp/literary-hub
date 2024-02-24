import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

const DailyPoem = () => {

  const currentDate = new Date();
  const formattedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    return (
        <View style={styles.poemOfTheDayContainer}>
            <ImageBackground
            source={require('../../assets/collection-images/default-collection-cover1.jpeg')}
            resizeMode="cover"
            style={styles.poemOfTheDay}
            imageStyle={{ borderRadius: 10 }}>
            <Text style={styles.poemOfTheDayText}>Poem of the Day</Text>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
  poemOfTheDayContainer: {
    marginTop: 20,
    position: 'relative',
  },
  poemOfTheDay: {
    height: 130,
  },
  poemOfTheDayText: {
    color: '#fff',
    fontFamily: 'Sarabun-ExtraBold',
    fontSize: 25,
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
});

export default DailyPoem;