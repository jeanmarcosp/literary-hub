import { View, FlatList, Text, StyleSheet } from "react-native";
import PoemCard from "./PoemCard";
import { React, useEffect, useState } from 'react';
import axios from "axios";


const TrendingPoems = () => {
  const poemData = [
    {
      id: 1,
      title: "October",
      excerpt: "O hushed October morning mild, Thy leaves have ripened to the fall",
      author: "Robert Frost",
    },
    {
      id: 2,
      title: "The Weary Blues",
      excerpt: "Droning a drowsy syncopated tune, Rocking back and forth to a mellow croon,",
      author: "Langston Hughes",
    },
    {
      id: 3,
      title: "Morning in the Burned House",
      excerpt: "In the burned house I am eating breakfast. You understand: there is no house, there is no breakfast,",
      author: "Margaret Atwood",
    },
  ];
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
        renderItem={({ item }) => (
          <>
            <PoemCard
              title={item.title}
              author={item.author}
              excerpt={item.content.split('\n').slice(0, 2).join('\n')} 
              likes={item.likes.length}
            />
          </>
        )}
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
