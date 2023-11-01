import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import Like from "../components/Like";
import getUserId from "../hooks/getUserId";

const HomeScreen = () => {
  const [annotationMode, handleAnnotationMode] = useState(false);
  const [randomPoem, setRandomPoem] = useState(null);
  const [poemPages, setPoemPages] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const pageWidth = Dimensions.get("window").width; // Get the screen width
  const linesPerPage = 15;

  const userId = getUserId();
  console.log("User ID:", userId);

  useEffect(() => {
    axios
      .get("http://localhost:3000/random-poem")
      .then((response) => {
        setRandomPoem(response.data[0]);
        const lines = response.data[0].content.split("\n"); // split the poem into lines
        const pages = [];
        let currentPage = "";
        let linesAdded = 0;

        for (const line of lines) {
          if (linesAdded >= linesPerPage) {
            pages.push(currentPage);
            currentPage = "";
            linesAdded = 0;
          }
          currentPage += line + "\n";
          linesAdded++;
        }

        if (currentPage.length > 0) {
          pages.push(currentPage);
        }

        setPoemPages(pages);
        setPageCount(pages.length);
      })
      .catch((error) => {
        console.error("Error fetching random poem:", error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container} id="page">
      <View style={styles.poemContainer} id="poem">
        {randomPoem && (
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false} // hide horizontal scrollbar
          >
            {poemPages.map((page, index) => (
              <View key={index} style={styles.page}>
                {index === 0 && (
                  <React.Fragment>
                    <Text style={styles.title}>{randomPoem.title}</Text>
                    <Text style={styles.author}>
                      Author: {randomPoem.author}
                    </Text>
                  </React.Fragment>
                )}
                <Text style={styles.pageContent}>{page}</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
      <View style={styles.toggle}>
        {annotationMode ? (
          <Pressable
            onPress={() => {
              handleAnnotationMode(false);
            }}
          >
            <MaterialCommunityIcons
              name="toggle-switch"
              size={35}
              color="black"
            />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              handleAnnotationMode(true);
            }}
          >
            <MaterialCommunityIcons
              name="toggle-switch-off-outline"
              size={35}
              color="black"
            />
          </Pressable>
        )}
      </View>
      <View>
        <View style={styles.columnView}>
          <Feather name="plus" size={24} color="black" />
          <Like />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  poemContainer: {
    flex: 1,
    borderColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  columnView: {
    gap: 15,
    left: 175,
    flex: 1,
    flexDirection: "column",
    bottom: 40,
    position: "absolute",
  },

  toggle: {
    flex: 1,
    left: 20,
    position: "absolute",
    bottom: 30,
  },

  page: {
    width: Dimensions.get("window").width,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  pageContent: {
    fontSize: 18,
    lineHeight: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  author: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 10,
  },
});
