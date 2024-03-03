import { View, FlatList, Text, StyleSheet } from "react-native";
import PoemCard from "./PoemCard";
import { React, useEffect, useState } from 'react';
import axios from "axios";
import getUserId from "../hooks/getUserId";


const TrendingPoems = () => {
  
  const [trendingPoems, setTrendPoems] = useState([]);
  const [userLikedPoems, setUserLikedPoems] = useState([]);
  const userId = getUserId();

  const fetchPoems = async() => {
    try {
      console.log("pulling trending poems");
      const response = await axios.get(`http://localhost:3000/trending-poems`);
      setTrendPoems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const refreshCard = async() => {
    try {
      const poemsResponse = await axios.get(`http://localhost:3000/trending-poems`);
      setTrendPoems(poemsResponse.data);
      const likedPoemsResponse = await axios.get(`${ROOT_URL}/users/${userId}/likedPoems`);
      setUserLikedPoems(likedPoemsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    const fetchLikedPoems = async () => {
      try {
        const response = await axios.get(
          `${ROOT_URL}/users/${userId}/likedPoems`
        );
        console.log("fetched liked poems");
        setUserLikedPoems(response.data);
      } catch (error) {
        console.error("Error fetching liked poems:", error);
      }
    };

    fetchLikedPoems();
  }, [userId]);
  
  useEffect(() => {
    fetchPoems();
  }, [])

  return (
    <View>
      <FlatList
        style={styles.poemList}
        data={trendingPoems}
        renderItem={({ item }) => {
          const wordCount = item.content.split(" ").length;
          let estimatedTime = parseInt(wordCount) / 200;
          let unit;

          if (estimatedTime < 1) {
            estimatedTime = "< " + String(1);
            unit = "min";
          } else {
            estimatedTime = String(Math.round(estimatedTime));
            unit = "min";
          }

          //console.log(estimatedTime);

          return (
            <PoemCard
              poemId={item._id}
              userId={userId}
              title={item.title}
              author={item.author}
              excerpt={item.content.split('\n').slice(0, 2).join('\n')}
              likes={item.likes.length}
              timeEstimate={estimatedTime} 
              inLikes={userLikedPoems.includes(item._id)}
              handleRefresh={refreshCard}
            />
          );
        }}
      />
    </View>
  );
};

export default TrendingPoems;

const styles = StyleSheet.create({
  poemList: {
    overflow: 'visible',
    marginTop: 15,
  }
})
