import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  FlatList,
  InputAccessoryView,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  Image
} from "react-native";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import axios from "axios";
import DialogInput from "react-native-dialog-input";
import { Ionicons } from "@expo/vector-icons";
import Comment from "./Comment";
import getUserId from "../hooks/getUserId";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const CommentSection = forwardRef((props, ref) => {
  const sheetRef = useRef(null);
  const [newComment, setNewComment] = useState("");
  const userId = getUserId();

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
        onPress={props.handleCommentsClose}
      />
    ),
    []
  );


  const handleComment = async () => {
    try {
      const postedComment = {
        userId: userId,
        poemId: props.poemId,
        content: newComment,
      };

      const response = await axios.post(`${ROOT_URL}/comment`, postedComment);

      console.log(
        "Created Comment successfully",
        response.data.comment.content
      );

      setNewComment("");
      props.handleRefresh();
    } catch (error) {
      console.error("Error commenting:", error);
    }
  };

  // console.log(props.comments);

  return (
    <BottomSheet
      ref={(bottomSheet) => {
        sheetRef.current = bottomSheet;
        if (ref) {
          ref.current = bottomSheet;
        }
      }}
      index={-1}
      snapPoints={["50%", "75%"]}
      enablePanDownToClose={false}
      handleIndicatorStyle={{ backgroundColor: "#fff" }}
      backgroundStyle={{ backgroundColor: "#fff" }}
      // backdropComponent={renderBackdrop}
      style={{ shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 10, }}
    >
      <View style={styles.contentContainer}>
        <View style={styles.commentsTopRow}>
          <Text style={styles.commentsNumber}>
            {props.comments?.length ?? 0} Comments
          </Text>
          <TouchableOpacity onPress={props.handleCommentsClose}>
            <View style={styles.closeComments}>
              <Ionicons name="close" size={23} color="#644980" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.commentsTopDivider}></View>

        {props.comments?.length == 0 && (
          <View style={styles.noComments}>
            <Image source={require('../assets/no-comments.jpeg')} style={styles.noCommentsImage}/>
            <Text style={styles.noCommentsTitle}>No comments yet</Text>
            <Text style={styles.noCommentsDescription}>Be the first to share your thoughts!</Text>
          </View>
        )}

        <BottomSheetScrollView style={styles.commentsScroll}>
          <FlatList
            style={styles.commentsList}
            data={props.comments}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Comment
                user={item.user}
                text={item.content}
                likeCount={item.likes.length}
                poemId={props.poemId}
                commentId={item._id}
                handleLikeRefresh={props.handleRefresh}
              />
            )}
          />
          
        </BottomSheetScrollView>

        {props.state && ( 
          <InputAccessoryView>
            <View style={styles.inputContainer}>
              <TextInput
                value={newComment}
                onChangeText={(text) => setNewComment(text)}
                placeholder={"Add comment"}
                style={styles.commentInput}
                multiline={true}
              />
              <Ionicons
                name="arrow-up-circle"
                size={36}
                color="#644980"
                onPress={handleComment}
              />
            </View>
          </InputAccessoryView>
        )}
        
        

      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },

  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
    color: "#fff",
  },

  button: {
    backgroundColor: "#644980",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    width: Dimensions.get("window").width * 0.5,
    alignSelf: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  collectionRow: {
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.7,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    margin: 3,
    backgroundColor: "#f6f5f5",
    borderRadius: 5,
  },

  collectionInfo: {
    flexDirection: "column",
  },

  collectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 5,
  },

  collectionLength: {
    fontSize: 16,
    fontWeight: 100,
    padding: 5,
  },

  collectionPoems: {
    fontSize: 10,
  },
  
  collectionButton: {
    backgroundColor: "#644980",
    padding: 10,
    borderRadius: 5,
  },

  commentsTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: Dimensions.get("window").width,
    paddingHorizontal: 20,
  },

  commentsNumber: {
    fontFamily: "Sarabun-Medium",
    color: "#6C7476",
    fontSize: 15,
  },

  closeComments: {
    backgroundColor: "#F7EEFF",
    borderRadius: 100,
    padding: 4,
  },

  commentsTopDivider: {
    width: Dimensions.get("window").width,
    borderBottomColor: "#E2E5E6",
    borderBottomWidth: 1,
    marginTop: 15,
  },

  noComments: {
    alignItems: 'center',
    marginTop: 100,
  },

  noCommentsImage: {
    resizeMode: 'cover',
    width: 200,
    height: 120,
  },

  noCommentsTitle: {
    fontFamily: 'Sarabun-Bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5,
    color: '#001E2B'
  },

  noCommentsDescription: {
    fontFamily: 'Sarabun-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: '#5C6C75'
  },

  commentsScroll: {
    backgroundColor: "#fff",
    width: Dimensions.get("screen").width,
    flex: 1,
  },

  commentsList: {
    marginTop: 20,
    marginBottom: 90,
  },

  inputContainer: {
    // position: "absolute",
    // bottom: 70,
    // left: 0,
    // right: 0,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-evenly',
    height: 75,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  commentInput: {
    borderRadius: 10,
    backgroundColor: "#F4F5F4",
    // marginVertical: 20,
    // height: 30,
    // paddingHorizontal: 15,
    // paddingVertical: 15,
    padding: 10,
    width: Dimensions.get("window").width * 0.83,
    minHeight: 35,
    maxHeight: 100,
  },
});

export default CommentSection;
