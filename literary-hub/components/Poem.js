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
  Modal,
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
import { Tooltip } from '@rneui/themed';
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
import Dots from "react-native-dots-pagination";

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
  const [activePage, setActivePage] = useState(0);
  const [fontMenuVisible, setFontMenuVisible] = useState(false);
  const [dyslexicFontEnabled, setDyslexicFontEnabled] = useState(false);
  const [fontSize, setFontSize] = useState(16); 
  const wordCount = poem.content.split(" ").length;
  var estimatedTime = parseInt(wordCount) / 200;
  const [open, setOpen] = useState(false);

  var unit;

  if (estimatedTime < 1) {
    estimatedTime = "< " + String(1);
    unit = "min";
  } else {
    estimatedTime = String(Math.round(estimatedTime));
    unit = "min";
  }

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

  const toggleFontMenu = () => {
    setFontMenuVisible(!fontMenuVisible);
  };

  const toggleDyslexicFont = () => {
    setDyslexicFontEnabled(!dyslexicFontEnabled);
  };

  const increaseFontSize = () => {
    if (fontSize < 24) {
      setFontSize(prevSize => Math.min(prevSize + 1, 24)); 
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 10) {
      setFontSize(prevSize => Math.max(prevSize - 1, 10)); 
    }
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
  const generateImage = async (prompt) => {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_KEY,
    });

    openai.baseURL = "https://api.openai.com/v1";
    openai.buildURL = (path) => `${openai.baseURL}${path}`;

    if (prompt) {
      if (prompt.length < 800) {
        prompt = "Illustration representing this poem: " + prompt;
      } else {
        prompt =
          "Illustration representing a poem by this title: " +
          currentPoem.title;
      }
    }

    try {
      const response = await openai.images.generate({
        model: "dall-e-2",
        prompt: prompt.replace(/\n/g, " "),
        n: 1,
        size: "256x256",
        response_format: "url",
      });
      setImage(response.data[0].url);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGenerateImage = () => {
    generateImage(poem.content);
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;

    if (contentOffsetX > activePage * Dimensions.get("window").width) {
      setActivePage((prevPage) => prevPage + 1);
    }

    if (contentOffsetX < activePage * Dimensions.get("window").width) {
      setActivePage((prevPage) => prevPage - 1);
    }
  };

  const ControlledTooltip = (props) => {
    const [open, setOpen] = React.useState(false);
    return (
      <Tooltip
        visible={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        {...props}
      />
    );
  };

  return (
    <View>
      {/* {collection && (
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
      )} */}


      {/* {!collection && !fromHome && (
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <View style={styles.backButton}>
            <Ionicons name="chevron-back" size={23} color="red" />
          </View>
        </TouchableOpacity>
      )} */}


      <View
        style={[
          styles.poemContainer,
          {
            height: collection
              ? Dimensions.get("window").height
              : Dimensions.get("window").height,
          },
        ]}
      >
        <ImageBackground
          source={
            image
              ? { uri: image }
              : require("../assets/collection-images/defaultCover.jpeg")
          }
          style={styles.image}
        >
          {/* {!fromHome && (
            <TouchableOpacity
              style={styles.bannerContainer}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
              <Text style={styles.collectionTitle}>{collection.title}</Text>
            </TouchableOpacity>
          )} */}

          <View style={styles.infoIcon}>
            <Tooltip
              visible={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              popover={
                <View style={styles.tooltip}>
                  <Text style={styles.tooltipTitle}>Images are AI-generated.</Text>
                  <Text style={styles.tooltipText}>Generative AI is experimental and quality may vary.</Text>
                </View>
              }
              backgroundColor={'#000'}
              width={270}
              height={80}
            >
                <Ionicons name="information-circle-outline" size={25} color="#fff" />
            </Tooltip>
          </View>

          <TouchableOpacity onPress={handleGenerateImage} style={styles.reloadContainer}>
            <View style={styles.reloadButton}>
              <Ionicons name="reload-outline" size={20} color="#000" />
            </View>
          </TouchableOpacity>

          {!fromHome && (
            <TouchableOpacity onPress={() => {navigation.goBack()}}>
              <View style={styles.backButton}>
                <Ionicons name="chevron-back" size={23} color="white" />
              </View>
            </TouchableOpacity>
          )}
          
        </ImageBackground>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={Dimensions.get("window").width}
          onScroll={handleScroll}
          scrollEventThrottle={900}
        >
          {poem.pages.map((page, index) => (
            <View
              key={index}
              style={[styles.page, { paddingTop: collection ? 20 : 10 }]}
            >
              {index === 0 && (
                <React.Fragment>
                  <View style={styles.titleBox}>
                    <Text style={styles.title}>{poem?.title}</Text>
                    <View style={styles.estimatedTime}>
                      <Text style={styles.estimatedTimeText}>
                        {estimatedTime} {unit}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.author}>by {poem.author}</Text>
                </React.Fragment>
              )}
              {/* <Text style={{ fontSize: fontSize, fontFamily: dyslexicFontEnabled ? 'dyslexicFont' : 'regularFont' }}> */}
              <Text style={{fontSize: fontSize, lineHeight: 24, fontFamily: dyslexicFontEnabled ? 'OpenDyslexicRegular': 'SFNSText-Regular'}}>{page}</Text>
            </View>
          ))}
        </ScrollView>

        <HomePageLike
          inLikes={isInitiallyLiked}
          handleLike={() => handleLike(userId, poemId)}
          handleDislike={() => handleDislike(userId, poemId)}
        />

        <View style={styles.pagination}>
          <Dots
            length={poem?.pages?.length || 10}
            active={activePage}
            activeColor="#644980"
            passiveColor="#C3CBCD"
          />
        </View>

        <View style={styles.plus}>
          <Pressable onPress={handleOpenPress} style={styles.icon}>
            <Feather name="plus" size={32} color="#644980" />
          </Pressable>
        </View>

        <View style={styles.fontIcon}>
          <TouchableOpacity onPress={toggleFontMenu}>
            <Ionicons name="text-outline" size={30} color="#644980" />
          </TouchableOpacity>
        </View>

        <Modal
        animationType="slide"
        transparent={true}
        visible={fontMenuVisible}
        onRequestClose={() => setFontMenuVisible(false)}
        >
        <View style={styles.modalBackground}>
          <View style={styles.modal}>
            <View style={styles.topRow}>
              <Text style={styles.modalTitle}>Font options</Text>
              <Pressable onPress={() => setFontMenuVisible(false)} >
                <Ionicons name="close" size={24} color="black" />
              </Pressable>
            </View>
            
            <View style={styles.fontSize}>
              <Text style={styles.fontSizeTitle}>Font Size</Text>

              <View style={styles.fontSizeActions}>
                <TouchableOpacity onPress={decreaseFontSize}>
                  <View style={styles.fontSizeActionCircle}>
                    <Ionicons name="remove" size={24} color="black" />
                  </View>
                </TouchableOpacity>
                <View style={styles.fontSizeNumberContainer}>
                  <Text style={styles.fontSizeNumber}>{fontSize}</Text>
                </View>
                <TouchableOpacity onPress={increaseFontSize}>
                  <View style={styles.fontSizeActionCircle}>
                    <Ionicons name="add" size={24} color="black" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            
            <TouchableOpacity onPress={toggleDyslexicFont}>
              <View style={styles.modalFontSwitch}>
                <Text style={styles.modalFontSwitchText}>Switch to </Text>
                <Text style={styles.modalFontSwitchTextBold}>{dyslexicFontEnabled ? 'Default' : 'Dyslexic-Friendly'} Font</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        </Modal>

        <View style={styles.commentIcon}>
          <Pressable onPress={handleCommentsOpen} style={styles.icon}>
            <Ionicons name="chatbox-outline" size={30} color="#644980" />
          </Pressable>
        </View>

        <CollectionBottomSheet
          ref={bottomSheetRef}
          title="Add to your collections"
          poem={poem}
          userId={userId}
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
    paddingBottom: screenHeight * 0.13,
    position: "relative",
    backgroundColor: "#fff",
  },

  titleBox: {
    flexDirection: "row",
    columnGap: 10,
    marginTop: 15,
    marginBottom: 15,
  },

  estimatedTime: {
    borderRadius: 10,
    backgroundColor: "#F9F3FF",
    borderRadius: 33,
    borderWidth: 1,
    borderColor: "#D6CEDF",
    justifyContent: "center",
    paddingHorizontal: 10,
    height: 25,
  },

  estimatedTimeText: {
    fontFamily: "Sarabun-Bold",
    color: "#774BA3",
  },

  title: {
    flexDirection: "column",
    fontSize: 24,
    fontFamily: "HammersmithOne",
    maxWidth: "80%",
  },

  author: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 20,
  },

  page: {
    width: Dimensions.get("window").width,
    paddingHorizontal: 14,
  },

  pageContent: {
    fontSize: 17,
    lineHeight: 24,
  },

  plus: {
    position: "absolute",
    left: screenWidth * 0.05,
    bottom: screenHeight * 0.12,
  },

  pagination: {
    position: "absolute",
    bottom: screenHeight * 0.13,
    alignItems: "center",
  },

  fontIcon: {
    position: "absolute",
    left: screenWidth * 0.05,
    bottom: screenHeight * 0.17,
  },

  commentIcon: {
    position: "absolute",
    right: screenWidth * 0.05,
    bottom: screenHeight * 0.17,
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
    left: 20,
    top: 40,
    backgroundColor: '#00000',
    backgroundColor: '#00000080',
    borderRadius: 100,
    alignSelf: 'baseline',
    padding: 5,
  },

  image: {
    position: "relative",
    width: "100%",
    height: 150,
  },

  infoIcon: {
    position: "absolute",
    bottom: 5,
    left: 5,
    padding: 10,
  },

  tooltipTitle: {
    color: 'white',
    fontFamily: 'Sarabun-ExtraBold',
    fontSize: 15,
    marginBottom: 5,
  },

  tooltipText: {
    color: 'lightgray',
    fontFamily: 'Sarabun-Light',
    fontSize: 15,
  },
  
  reloadContainer: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },

  reloadButton: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    alignSelf: "baseline",
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
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  bannerContainer: {
    flexDirection: "row",
    alignItems: "center",
    top: 45,
    left: 15,
  },

  dummyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  dummyText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modal: {
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingVertical: 25,
    borderRadius: 10,
    width: '85%'
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  modalTitle: {
    fontFamily: 'Sarabun-ExtraBold',
    fontSize: 20,
  },

  fontSize: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 40,
  },

  fontSizeTitle: {
    fontFamily: 'Sarabun-Regular',
    fontSize: 18,
  },

  fontSizeActions: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
  },

  fontSizeActionCircle: {
    padding: 5,
    backgroundColor: '#F6F6F6',
    borderRadius: 100,
  },

  fontSizeNumber: {
    fontFamily: 'Sarabun-Regular',
    fontSize: 20,
    color: '#774BA3'
  },

  fontSizeNumberContainer: {
    padding: 10,
    borderColor: '#D6CEDF',
    borderWidth: 1.3,
    borderRadius: 10,
    backgroundColor: '#F9F3FF',
  },

  modalFontSwitch: {
    backgroundColor: '#F7F7F7',
    borderColor: '#E1E1E1',
    borderRadius: 10,
    borderWidth: 1.3,
    marginTop: 30,
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'center'
  },

  modalFontSwitchText: {
    fontFamily: 'Sarabun-Regular',
    fontSize: 16,
  },

  modalFontSwitchTextBold: {
    fontFamily: 'Sarabun-Bold',
    fontSize: 16,
  },

  dyslexicFont: {
    fontFamily: "OpenDyslexic-Regular",
  },

  regularFont: {
    fontFamily: "SFNSText-Regular",
  },
});

export default Poem;
