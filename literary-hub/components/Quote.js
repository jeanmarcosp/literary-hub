import {React, useState} from "react";
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
import CollectionCard from "./CollectionCard";
import QuoteCard from "./QuoteCard";
import { Ionicons } from "@expo/vector-icons";

const quotesData = [
  {
    id: "1",
    poemId: "1",
    quote: "Tis better to have loved and lost than never to have loved at all",
  },
  {
    id: "2",
    poemId: "2",
    quote:
      "A light from the shadows shall spring; Renewed shall be blade that was broken, The crownless again shall be king",
  },
  {
    id: "3",
    poemId: "3",
    quote: "Tread softly because you tread on my dreams",
  },
];

const Quote = () => {
  return (
    <FlatList
      data={quotesData}
      renderItem={({ item }) => (
        <QuoteCard poemId={item.poemId} quote={item.quote} />
      )}
      keyExtractor={(item) => item.id}
    //   style={styles.collections}
    />
  );
};

export default Quote;
