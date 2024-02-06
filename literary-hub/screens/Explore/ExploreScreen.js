import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import PoemCard from "../../components/PoemCard.js";
import { React, useState} from "react";
import AuthorList from "../../components/AuthorList";
import SearchBar from "../../components/SearchBar.js";
import { Ionicons } from "@expo/vector-icons";
import TrendingPoems from "../../components/TrendingPoems";
import TrendingCollections from "../../components/TrendingCollections";
import Quote from "../../components/Quote";
import SearchResult from "../../components/SearchResult.js";
const ExploreScreen = () => {
  const [segmentedControlView, setSegmentedControlView] =
    useState("Collections");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = (results) =>{

    setSearchResults(results);
    console.log('results are: ', results);
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <SearchBar onSearch={handleSearch}/>

        <View style={styles.poemOfTheDayContainer}>
          <ImageBackground
            source={require('../../assets/collection-images/default-collection-cover1.jpeg')}
            resizeMode="cover"
            style={styles.poemOfTheDay}
            imageStyle={{ borderRadius: 10 }}>
            <Text style={styles.poemOfTheDayText}>Poem of the Day</Text>
          </ImageBackground>
        </View>

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
        
      </ScrollView>

       {/* Overlay the SearchResult component below the search bar */}
       <View style={styles.overlayResultContainer}>
        {searchResults['poems']?.map((poem) => (
          <SearchResult
            type='poem'
            data={poem}
            key={poem._id}
            Poem = {poem}
            style={styles.overlayResult}
          />
        ))}
        {searchResults['users']?.map((user) => (
          <SearchResult
            type='user'
            data={user}
            key={user._id}
            User = {user}
            style={styles.overlayResult}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },

  scrollView: {
    paddingTop: 15,
    paddingHorizontal: 20,
  },

  poemOfTheDay: {
    height: 130,
    marginTop: 20,
    position: 'relative',
  },

  poemOfTheDayText: {
    color: '#fff',
    fontFamily: 'Sarabun-ExtraBold',
    fontSize: 25,
    position: 'absolute',
    bottom: 20,
    left: 20,
  },

  text: {
    fontFamily: "HammersmithOne",
    fontSize: 24,
    marginTop: 23,
  },

  segmentedControl: {
    flexDirection: "row",
    marginTop: 7,
    columnGap: 10,
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
  overlayResultContainer: {
    position: 'absolute',
    top: 115, 
    left: 0,
    right: 0,
    zIndex: 999, 
  },

  overlayResult: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
  },
});
