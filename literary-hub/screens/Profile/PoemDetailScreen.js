import CollectionBottomSheet from "../../components/CollectionBottomSheet";
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import HomePageLike from "../../components/HomePageLike";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import getUserId from "../../hooks/getUserId";
import axios from "axios";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import Comment from "../../components/Comment";
import CommentSection from "../../components/CommentSection";

const PoemDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const [annotationMode, handleAnnotationMode] = useState(false);
  const { poem, isLiked, comments, handleRefresh } = route.params;
  const [liked, setLiked] = useState(isLiked);
  const bottomSheetRef = useRef(null);
  const [userLikedPoems, setUserLikedPoems] = useState([]);
  const userId = getUserId();
  const [processedPoem, setProcessedPoem] = useState(null);
  const linesPerPage = 20;

  const [openComments, setOpenComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const commentSectionRef = useRef(null);
  const [currentPoem, setCurrentPoem] = useState({});

  const handleCommentsOpen = () => {
    commentSectionRef.current?.expand();
    setOpenComments(true);
  };

  const handleCommentsClose = () => {
    commentSectionRef.current?.close();
    setOpenComments(false);
  };

  useEffect(() => {
    if (poem && poem.content) {
      const lines = poem.content.split("\n");
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

      setProcessedPoem({ ...poem, pages });
    }
  }, [poem]);

  const onLike = async (poemId) => {
    try {
      await axios.put(`${ROOT_URL}/poems/${poemId}/${userId}/like`);
    } catch (error) {
      console.error("Error liking poem:", error);
    }
  };

  const onUnlike = async (poemId) => {
    try {
      await axios.put(`${ROOT_URL}/poems/${poemId}/${userId}/unlike`);
    } catch (error) {
      console.error("Error unliking poem:", error);
    }
  };

  const handleClosePress = () => {
    bottomSheetRef.current?.close();
  };

  const handleOpenPress = () => {
    bottomSheetRef.current?.expand();
  };

  const goBack = () => {
    console.log("Back button pressed");
    navigation.goBack();
  };

  useEffect(() => {
    const fetchLikedPoems = async () => {
      try {
        const response = await axios.get(
          `${ROOT_URL}/users/${userId}/likedPoems`
        );
        setUserLikedPoems(response.data);
      } catch (error) {
        console.error("Error fetching liked poems:", error);
      }
    };

    fetchLikedPoems();
  }, [userId]);

  const isInitiallyLiked = userLikedPoems.includes(poem._id);

  // console.log("testing", poem._id)

  const fetchPoem = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/poem/${poem._id}`
      );
      const fetchedpoem = response.data.poem;
      setCurrentPoem(fetchedpoem);
    } catch (error) {
      console.log("error", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPoem();
    }, [poem._id])
  );

  // console.log("moved poem", currentPoem.comments);

  return (
    <View style={styles.poemContainer}>
      <TouchableOpacity
        onPress={goBack}
        style={{ marginRight: 375, marginTop: 30 }}
      >
        <Ionicons name="arrow-back" size={30} color="#644980" />
      </TouchableOpacity>

      {processedPoem && processedPoem.pages ? (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={Dimensions.get("window").width}
        >
          {processedPoem.pages.map((page, index) => (
            <View key={index} style={styles.page}>
              {index === 0 && (
                <React.Fragment>
                  <Text style={styles.title}>{processedPoem.title}</Text>
                  <Text style={styles.author}>
                    Author: {processedPoem.author}
                  </Text>
                </React.Fragment>
              )}
              <Text style={styles.pageContent}>{page}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text>Loading poem...</Text>
      )}

      

      <HomePageLike
        inLikes={liked}
        handleLike={() => {
          onLike(poem._id);
          setLiked(true);
        }}
        handleDislike={() => {
          onUnlike(poem._id);
          setLiked(false);
        }}
      />

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
              color="#644980"
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
              color="#644980"
            />
          </Pressable>
        )}
      </View>

      <View style={styles.plus}>
        <Pressable onPress={handleOpenPress} style={styles.icon}>
          <Feather name="plus" size={30} color="#644980" />
        </Pressable>
      </View>
      <View style={styles.comment}>
        <Pressable onPress={handleCommentsOpen} style={styles.icon}>
          <Ionicons name="chatbox-outline" size={30} color="#644980" />
        </Pressable>
      </View>

      <CollectionBottomSheet
        ref={bottomSheetRef}
        title="Add to Collection"
        poem={poem}
      />
      <CommentSection
        ref={commentSectionRef}
        handleCommentsClose={handleCommentsClose}
        comments={currentPoem.comments}
        poemId={poem._id}
        handleRefresh={fetchPoem}
      />

      {openComments}
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  poemContainer: {
    height: Dimensions.get("window").height,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 30,
    position: "relative",
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
  page: {
    width: Dimensions.get("window").width,
    paddingTop: 20,
  },
  pageContent: {
    fontSize: 18,
    lineHeight: 24,
  },
  toggle: {
    position: "absolute",
    left: screenWidth * 0.05,
    bottom: screenHeight * 0.1,
  },
  plus: {
    position: "absolute",
    right: screenWidth * 0.05,
    bottom: screenHeight * 0.15,
  },
  comment: {
    position: "absolute",
    right: screenWidth * 0.05,
    bottom: screenHeight * 0.2,
  },
  bottomSheet: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: screenWidth * 0.05,
  },
  actionContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 370,
  },
});

export default PoemDetailScreen;
