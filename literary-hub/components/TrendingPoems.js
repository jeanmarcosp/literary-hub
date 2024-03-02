import { View, FlatList, Text, StyleSheet } from "react-native";
import PoemCard from "./PoemCard";
import { React, useEffect, useState } from 'react';
import axios from "axios";


const TrendingPoems = () => {
  
  const [trendingPoems, setTrendPoems] = useState([]);

  const fetchPoems = async() => {
    try {
      console.log("pulling trending poems");
      const response = await axios.get(`http://localhost:3000/trending-poems`);
      setTrendPoems(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchPoems();
  }, [])

  return (
    <View>
      <FlatList
        style={styles.poemList}
        data={trendingPoems}
        keyExtractor={(item) => item._id.toString()}
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
              title={item.title}
              author={item.author}
              excerpt={item.content.split('\n').slice(0, 2).join('\n')}
              likesCount={item.likes.length}
              timeEstimate={estimatedTime} 
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
