import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import AuthorList from "../components/AuthorList";
import SearchBar from "../components/SearchBar.js";
import TrendingList from "../components/TrendingList";
import { Ionicons } from '@expo/vector-icons';

const ExploreScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <SearchBar />
        <Text style={styles.text}>Author Collections</Text>
        <AuthorList />
        <Text style={styles.text}>Trending</Text>
        <TrendingList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  text: {
    fontFamily: "PromptSemiBold",
    fontSize: 28,
    marginLeft: 10,
  },
});
