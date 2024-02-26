import {React, useEffect, useState} from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { poemToPage } from '../../hooks/poemActions';

const DailyPoem = () => {
  const [poem, setPoem] = useState(null);
  const currentDate = new Date();
  const formattedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const navigation = useNavigation();
  const userLikedPoems = [];

  useEffect(() => {
    const fetchDailyPoem = async () => {
      try {
        const response = await fetch(`http://localhost:3000/daily-poems/${formattedDate}`); 
        
        if (!response.ok) {
          throw new Error('Failed to fetch daily poem');
        }
        
        const data = await response.json();
        setPoem(data.poem); 
        console.log("HOLAHOLA", data.poem);
  
      } catch (error) {
        console.error(error);
      }
  
    };
    fetchDailyPoem()
  }, []);

  if (poem) {
    poemToPage([poem], 17);
  }

  const handlePress = async () => {
    if (!poem) {
      await fetchDailyPoem();
    }
    const poemId = poem._id
    
    navigation.navigate('SinglePoem', { poem, poemId, userLikedPoems, fromHome:false }); 
  };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.poemOfTheDayContainer}>
            <ImageBackground
            source={require('../../assets/collection-images/default-collection-cover1.jpeg')}
            resizeMode="cover"
            style={styles.poemOfTheDay}
            imageStyle={{ borderRadius: 10 }}>
            <Text style={styles.poemOfTheDayText}>Poem of the Day</Text>
            </ImageBackground>
        </TouchableOpacity>
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