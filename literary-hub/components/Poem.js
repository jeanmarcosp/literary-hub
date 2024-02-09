// Poem.js
import CollectionBottomSheet from "../components/CollectionBottomSheet";
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  Keyboard,
  Button,
  TouchableOpacity,
  InputAccessoryView,
  SafeAreaView
} from "react-native";
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { TextInput } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import HomePageLike from "./HomePageLike";
import CommentSection from "./CommentSection";
import {
  markPoemAsRead,
  handleDislike,
  handleLike,
} from "../hooks/poemActions";
import getUserId from "../hooks/getUserId";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import OpenAI from "openai";

const Poem = ({ route }) => {
  const { poem, poemId, userLikedPoems, fromHome, collection, comments } =
    route.params || {};
  const navigation = useNavigation();
  const [annotationMode, handleAnnotationMode] = useState(false);
  const bottomSheetRef = useRef(null);
  const commentSectionRef = useRef(null);
  const READ_TIMER_DURATION = 5000;
  const [isRead, setIsRead] = useState(false);
  const isInitiallyLiked = userLikedPoems.includes(poemId);
  const [openComments, setOpenComments] = useState(false);
  const userId = getUserId();
  const [currentPoem, setCurrentPoem] = useState({});

  const [prompt, setPrompt]=useState("cat, low detail");
  // if poem is already marked as read, do nothing
  // if it isn't, mark it as read
  useEffect(() => {
    if (isRead) return;

    const timer = setTimeout(() => {
      if (true) {
        markPoemAsRead(userId, poemId);
        setIsRead(true);
      }
    }, READ_TIMER_DURATION);

    return () => clearTimeout(timer);
  }, [poemId, isRead]);

  const handleClosePress = () => {
    bottomSheetRef.current?.close();
  };
  const handleOpenPress = () => {
    bottomSheetRef.current?.expand();
  };

  const handleCommentsOpen = () => {
    commentSectionRef.current?.expand();
    setOpenComments(true);
  };

  const handleCommentsClose = () => {
    commentSectionRef.current?.close();
    setOpenComments(false);
  };

  const fetchPoem = async () => {
    try {
      const response = await axios.get(`${ROOT_URL}/poem/${poemId}`);
      const fetchedpoem = response.data.poem;
      setCurrentPoem(fetchedpoem);
      if(currentPoem.content){
        setPrompt(currentPoem.content);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPoem();
    }, [poemId])
  );
  const openai = new OpenAI({
    apiKey: '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',
  })
  // const { Configuration, OpenAIApi } = require("openai");
  // const configuration = new Configuration({
  //   apiKey: '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',
  // });
  // const openai = new OpenAIApi(configuration);
  const [image, setImage] = useState(null);
  const generateImage = async(prompt) => {
    console.log("i am generating image");
    try {
      const response = await openai.images.generate({
        model: "dall-e-2",
        prompt: prompt.replace(/\n/g, ' '),
        n: 1,
        size: "256x256",
        response_format: "url",
      });
      console.log("POOPY", response.data);
      setImage(response.data)

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGenerateImage = () => {
    generateImage(poem.content); // Pass poem content as the prompt
  };

  return (
    <SafeAreaView style={styles.dummyContainer}>
      <Text style={styles.dummyText}>Hello</Text>
      <TouchableOpacity onPress={handleGenerateImage}>
        <Text>Generate image</Text>
      </TouchableOpacity>
      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}
    </SafeAreaView>
    // <View>
    //   {collection && (
    //     <ImageBackground
    //       source={
    //         collection.coverArt
    //           ? { uri: collection.coverArt }
    //           : require("../assets/collection-images/defaultCover.jpeg")
    //       }
    //       style={styles.image}
    //       resizeMode="cover"
    //     >
    //       {!fromHome && (
    //         <TouchableOpacity
    //           style={styles.bannerContainer}
    //           onPress={() => navigation.goBack()}
    //         >
    //           <Ionicons name="chevron-back" size={24} color="white" />
    //           <Text style={styles.collectionTitle}>{collection.title}</Text>
    //         </TouchableOpacity>
    //       )}
    //     </ImageBackground>
    //   )}
    //   <View
    //     style={[
    //       styles.poemContainer,
    //       {
    //         height: collection
    //           ? Dimensions.get("window").height - 100
    //           : Dimensions.get("window").height,
    //       },
    //     ]}
    //   >
    //     <ScrollView
    //       horizontal
    //       pagingEnabled
    //       showsHorizontalScrollIndicator={false}
    //       decelerationRate="fast"
    //       snapToInterval={Dimensions.get("window").width}
    //     >
    //       {poem.pages.map((page, index) => (
    //         <View
    //           key={index}
    //           style={[styles.page, { paddingTop: collection ? 20 : 50 }]}
    //         >
    //           {index === 0 && (
    //             <React.Fragment>
    //               <Text style={styles.title}>{poem.title}</Text>
    //               <Text style={styles.author}>Author: {poem.author}</Text>
    //             </React.Fragment>
    //           )}
    //           <Text style={styles.pageContent}>{page}</Text>
    //         </View>
    //       ))}
    //     </ScrollView>

    //     <HomePageLike
    //       inLikes={isInitiallyLiked}
    //       handleLike={() => handleLike(userId, poemId)}
    //       handleDislike={() => handleDislike(userId, poemId)}
    //     />

    //     <View style={styles.toggle}>
    //       {annotationMode ? (
    //         <Pressable
    //           onPress={() => {
    //             handleAnnotationMode(false);
    //           }}
    //         >
    //           <MaterialCommunityIcons
    //             name="toggle-switch"
    //             size={35}
    //             color="#644980"
    //           />
    //         </Pressable>
    //       ) : (
    //         <Pressable
    //           onPress={() => {
    //             handleAnnotationMode(true);
    //           }}
    //         >
    //           <MaterialCommunityIcons
    //             name="toggle-switch-off-outline"
    //             size={35}
    //             color="#644980"
    //           />
    //         </Pressable>
    //       )}
    //     </View>

    //     <View style={styles.plus}>
    //       <Pressable onPress={handleOpenPress} style={styles.icon}>
    //         <Feather name="plus" size={30} color="#644980" />
    //       </Pressable>
    //     </View>

    //     <View style={styles.commentIcon}>
    //       <Pressable onPress={handleCommentsOpen} style={styles.icon}>
    //         <Ionicons name="chatbox-outline" size={30} color="#644980" />
    //       </Pressable>
    //     </View>

    //     <CollectionBottomSheet
    //       ref={bottomSheetRef}
    //       title="Add to Collection"
    //       poem={poem}
    //     />

    //     <CommentSection
    //       ref={commentSectionRef}
    //       handleCommentsClose={handleCommentsClose}
    //       comments={currentPoem.comments}
    //       poemId={poem._id}
    //       handleRefresh={fetchPoem}
    //     />

    //     {openComments}
    //   </View>
    // </View>
  );
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  poemContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingBottom: 0,
    position: "relative",
    backgroundColor: "#fff",
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

  heart: {
    position: "absolute",
    right: screenWidth * 0.045,
    bottom: screenHeight * 0.1,
  },

  plus: {
    position: "absolute",
    right: screenWidth * 0.05,
    bottom: screenHeight * 0.15,
  },

  commentIcon: {
    position: "absolute",
    right: screenWidth * 0.05,
    bottom: screenHeight * 0.2,
  },

  bottomSheet: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  inputContainer: {
    backgroundColor: "#fff",
  },

  commentInput: {
    borderRadius: 100,
    backgroundColor: "#F4F5F4",
    marginHorizontal: 12,
    marginVertical: 12,
    height: 30,
    paddingHorizontal: 10,
  },

  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: "#00000080",
    borderRadius: 100,
    padding: 5,
  },
  image: {
    position: "relative",
    width: "100%",
    height: 100,
    alignItems: "left",
  },
  collectionTitle: {
    color: "white",
    fontFamily: "HammersmithOne",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  bannerContainer: {
    flexDirection: "row", // Align items in a row
    alignItems: "center", // Center items vertically
    paddingHorizontal: 20, // Adjust as needed
    paddingVertical: 10, // Adjust as needed
    top: 60,
  },
  dummyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dummyText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Poem;
