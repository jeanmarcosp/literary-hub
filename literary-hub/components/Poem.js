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
  SafeAreaView,
  Image,
  ImageBackground,
  Modal
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
import { BlurView } from "@react-native-community/blur";
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

  
  const wordCount = poem.content.split(' ').length;
  var estimatedTime = parseInt(wordCount) / 200;
  console.log(estimatedTime);
  console.log(Math.round(estimatedTime));
  
  var unit;
  
  if (estimatedTime < 1) {
    estimatedTime = '< ' + String(1);
    unit = 'min';
  } else {
    estimatedTime = String(Math.round(estimatedTime));
    unit = 'min';
  }
  
  console.log(estimatedTime + ' ' + unit);


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
    } catch (error) {
      console.log("error", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPoem();
    }, [poemId])
  );

  const [image, setImage] = useState(null);
  const generateImage = async(prompt) => {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_KEY,
    })

    openai.baseURL = 'https://api.openai.com/v1';
    openai.buildURL = (path) => `${openai.baseURL}${path}`;

    if(prompt){
      if(prompt.length < 800){
        prompt = "Illustration representing this poem: " + prompt;
      } else {
        prompt = "Illustration representing a poem by this title: " + currentPoem.title
      }
    }

    try {
      const response = await openai.images.generate({
        "model": "dall-e-2",
        "prompt": prompt.replace(/\n/g, ' '),
        "n": 1,
        "size": "256x256",
        "response_format": "url",
      });
      setImage(response.data[0].url)

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGenerateImage = () => {
    generateImage(poem.content); 
  };

  return (
    <View>
      {collection && (
        <ImageBackground
          source={
            collection.coverArt
              ? { uri: collection.coverArt }
              : require("../assets/collection-images/defaultCover.jpeg")
          }
          style={styles.collectionCover}
          resizeMode="cover"
        >
          {!fromHome && (
            <TouchableOpacity
              style={styles.bannerContainer}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
              <Text style={styles.collectionTitle}>{collection.title}</Text>
            </TouchableOpacity>
          )}
        </ImageBackground>
      )}
      
      <View
        style={[
          styles.poemContainer,
          {
            height: collection
              ? Dimensions.get("window").height - 100
              : Dimensions.get("window").height,
          },
        ]}
      >
        <ImageBackground
            source={image ? { uri: image } : require('../assets/collection-images/defaultCover.jpeg')}
            style={styles.image}
        >
          
          <TouchableOpacity onPress={handleGenerateImage} style={styles.reloadContainer}>
            <View style={styles.reloadButton}>
              <Ionicons name="reload-outline" size={20} color="#000" />
              {/* <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={10}
                reducedTransparencyFallbackColor="white"
              /> */}
            </View>
          </TouchableOpacity>
        </ImageBackground>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={Dimensions.get("window").width}
        >
        
        
          {poem.pages.map((page, index) => (
            <View
              key={index}
              style={[styles.page, { paddingTop: collection ? 20 : 10 }]}
            >
              {index === 0 && (
                <React.Fragment>
                  <View style={styles.titleBox}>
                    <Text style={styles.title}>{poem.title}</Text>
                    <View style={styles.estimatedTime}>
                      <Text style={styles.estimatedTimeText}>
                        {estimatedTime} {unit}
                      </Text> 
                    </View>
                  </View>
                  <Text style={styles.author}>by {poem.author}</Text>
                </React.Fragment>
              )}
              <Text style={styles.pageContent}>{page}</Text>
            </View>
          ))}
        </ScrollView>

        <HomePageLike
          inLikes={isInitiallyLiked}
          handleLike={() => handleLike(userId, poemId)}
          handleDislike={() => handleDislike(userId, poemId)}
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

        <View style={styles.commentIcon}>
          <Pressable onPress={handleCommentsOpen} style={styles.icon}>
            <Ionicons name="chatbox-outline" size={30} color="#644980" />
          </Pressable>
        </View>

        <CollectionBottomSheet
          ref={bottomSheetRef}
          title="Add to your collections"
          poem={poem}
          userId = {userId}
        />

        <CommentSection
          ref={commentSectionRef}
          handleCommentsClose={handleCommentsClose}
          comments={currentPoem.comments}
          poemId={poem._id}
          handleRefresh={fetchPoem}
          state={openComments}
        />

        {openComments}
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  poemContainer: {
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 16,
    paddingBottom: 0,
    position: "relative",
    backgroundColor: "#fff",
  },

  titleBox: {
    flexDirection: 'row',
    columnGap: 10,
    marginTop: 15,
    marginBottom: 15,
  },

  estimatedTime: {
    borderRadius: 10,
    backgroundColor: '#F9F3FF', 
    borderRadius: 33, 
    borderWidth: 1,
    borderColor: '#D6CEDF',
    justifyContent: 'center', 
    paddingHorizontal: 10,
    height: 25,
  },

  estimatedTimeText: {
    fontFamily: 'Sarabun-Bold',
    color: '#774BA3'
  },

  title: {
    flexDirection: 'column',
    fontSize: 24,
    fontFamily: 'HammersmithOne',
    maxWidth: '80%',
  },

  author: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 20,
  },

  page: {
    width: Dimensions.get("window").width,
    paddingHorizontal: 16,
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
    height: 150,
  },

  reloadContainer: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },

  reloadButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignSelf: 'baseline',
    padding: 7,
    borderRadius: 100,
  },

  collectionCover: {
    position: "relative",
    width: "100%",
    height: 100,
  },

  collectionTitle: {
    color: "white",
    fontFamily: "HammersmithOne",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },

  bannerContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    paddingHorizontal: 20,
    paddingVertical: 10,
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
