import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { poemToPage } from '../../hooks/poemActions';
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import getUserId from "../../hooks/getUserId";
import axios from "axios";

const DailyPoem = () => {
  const [poem, setPoem] = useState(null);
  const currentDate = new Date();
  const formattedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const navigation = useNavigation();
  const userLikedPoems = [];
  const userId = getUserId();
  const [user, setUser] = useState({});


  useEffect(() => {
    const fetchDailyPoem = async () => {
      try {
        const response = await fetch(`${ROOT_URL}/daily-poems/${formattedDate}`); 
        
        if (!response.ok) {
          throw new Error('Failed to fetch daily poem');
        }
        
        const data = await response.json();
        setPoem(data.poem); 
  
      } catch (error) {
        console.error(error);
      }
  
    };
    fetchDailyPoem()
  }, []);

  if (poem) {
    poemToPage([poem], 17);
  }

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${ROOT_URL}/profile/${userId}`);
      const user = response.data.user;

      setUser(user);
    } catch (error) {
      console.log("error", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchProfile();
    }, [userId])
  );

  const handlePress = async () => {
    if (!poem) {
      await fetchDailyPoem();
    }
    const poemId = poem._id

    //once a user clicks poem of the day, the poemId should be added to thier poemsOfTheDay field

    fetchProfile();
    navigation.navigate('SinglePoem', { poem, poemId, userLikedPoems, fromHome:false }); 
  };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.poemOfTheDayContainer}>
            <ImageBackground
            source={require('../../assets/poem-of-the-day.jpeg')}
            resizeMode="cover"
            style={styles.poemOfTheDay}
            imageStyle={{ borderRadius: 10, opacity: 0.8 }}>
              <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']} // Adjust gradient colors and opacity here
                style={styles.gradient}
              />
              <View style={styles.streakContainer}>
                <Text style={styles.streak}>{user?.poemsOfTheDay?.length}</Text>
                <Ionicons name="flame" size={14} color="#EE6F3F" />
              </View>
              <View style={styles.poemOfTheDayAction}>
                <Text style={styles.poemOfTheDayText}>Poem of the Day</Text>
                <Ionicons name="arrow-forward-circle" size={30} color="#fff" />
              </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  poemOfTheDayContainer: {
    marginTop: 20,
    position: 'relative',
    // borderWidth: 3,
    // borderColor: '#D6B6B6',
    // borderRadius: 14,
  },

  poemOfTheDay: {
    height: 130,
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
  },

  streakContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: '#393939',
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    columnGap: 5,
    position: 'absolute',
    top: 0,
    right: 0,
  },

  streak: {
    color: '#fff',
    fontFamily: 'Sarabun-Medium',
    fontSize: 16,
  },

  poemOfTheDayAction: {
    flexDirection: 'row',
    alignItems: 'end',
    columnGap: 10,
    position: 'absolute',
    bottom: 15,
    left: 20,
  },

  poemOfTheDayText: {
    color: '#fff',
    fontFamily: 'Sarabun-ExtraBold',
    fontSize: 25,
  },
});

export default DailyPoem;