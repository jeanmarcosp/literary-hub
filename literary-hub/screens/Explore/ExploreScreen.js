import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { React, useState } from "react";
import AuthorList from "../../components/AuthorList";
import SearchBar from "../../components/SearchBar.js";
import { Ionicons } from "@expo/vector-icons";
import TrendingPoems from "../../components/TrendingPoems";
import TrendingCollections from "../../components/TrendingCollections";
import Quote from "../../components/Quote";

const ExploreScreen = () => {
  const [segmentedControlView, setSegmentedControlView] =
    useState("Collections");
  return (
    <SafeAreaView style={styles.container}>
        <SearchBar />

        <Text style={styles.text}>Author Collections</Text>
        <AuthorList />

        <Text style={styles.text}>Trending</Text>
        <View style={styles.segmentedControl}>
          <TouchableOpacity
            onPress={() => setSegmentedControlView("Collections")}
          >
            <View
              style={
                segmentedControlView === "Collections"
                  ? styles.segmentedControlSelected
                  : styles.segmentedControlUnselected
              }
            >
              <Text
                style={
                  segmentedControlView === "Collections"
                    ? styles.segmentedControlSelectedText
                    : styles.segmentedControlUnselectedText
                }
              >
                Collections
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSegmentedControlView("Poems")}>
            <View
              style={
                segmentedControlView === "Poems"
                  ? styles.segmentedControlSelected
                  : styles.segmentedControlUnselected
              }
            >
              <Text
                style={
                  segmentedControlView === "Poems"
                    ? styles.segmentedControlSelectedText
                    : styles.segmentedControlUnselectedText
                }
              >
                Poems
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSegmentedControlView("Quotes")}>
            <View
              style={
                segmentedControlView === "Quotes"
                  ? styles.segmentedControlSelected
                  : styles.segmentedControlUnselected
              }
            >
              <Text
                style={
                  segmentedControlView === "Quotes"
                    ? styles.segmentedControlSelectedText
                    : styles.segmentedControlUnselectedText
                }
              >
                Quotes
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.leftAligned}>
          {segmentedControlView === "Collections" && <TrendingCollections />}
          {segmentedControlView === "Poems" && <TrendingPoems />}
          {segmentedControlView === "Quotes" && <Quote />}
        </View>
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    paddingHorizontal: 50,
    paddingTop:15
  },

  scrollView: {
    paddingTop: 15,
    paddingHorizontal: 20,
  },

  text: {
    fontFamily: "HammersmithOne",
    fontSize: 24,
    marginTop: 23,
  },

  segmentedControl: {
    flexDirection: "row",
    marginTop: 7,
    // columnGap: 10,
    justifyContent:"space-between",
  },

  segmentedControlSelected: {
    borderRadius: 100,
    paddingVertical: 7,
    paddingHorizontal: 20,
    backgroundColor: "#644980",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#644980",
  },

  segmentedControlSelectedText: {
    fontFamily: "HammersmithOne",
    fontSize: 15,
    color: "white",
  },

  segmentedControlUnselected: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#644980",
    paddingVertical: 7,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  segmentedControlUnselectedText: {
    fontFamily: "HammersmithOne",
    fontSize: 15,
    color: "#644980",
  },
});
