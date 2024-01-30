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
    TextInput
  } from "react-native";
  import BottomSheet, {
    BottomSheetScrollView,
    BottomSheetBackdrop,
  } from "@gorhom/bottom-sheet";
  import axios from "axios";
  import DialogInput from "react-native-dialog-input";
  import { Ionicons } from "@expo/vector-icons";
  import Comment from './Comment'

  const CommentSection = forwardRef((props, ref) => {
    const sheetRef = useRef(null);
    const [newComment, setNewComment] = useState('');

    const commentData = [
        {
            id: 1,
            user: 'person1',
            text: 'A poetic reference to a woodland spirit or nymph, characterized by her airy and graceful presence among the trees.',
            likeCount: 14,
        },
        {
            id: 2,
            user: 'person2',
            text: 'A metaphor for someone who is intimately connected to nature and exhibits a light and free-spirited demeanor, akin to the spirits of the forest.',
            likeCount: 11,
        },
        {
            id: 3,
            user: 'person3',
            text: 'Symbolizing the delicate and ephemeral nature of a person or creature that seems to effortlessly float among the trees, perhaps denoting a sense of ethereal beauty.',
            likeCount: 9,
        },
        {
            id: 4,
            user: 'person2',
            text: 'A portrayal of a muse or inspiration, suggesting that the muse is as elusive and graceful as a forest nymph, bringing creativity and artistry to life.',
            likeCount: 11,
        },
        {
            id: 5,
            user: 'person2',
            text: 'An allusion to the idea that this figure is the guardian or protector of the trees, embodying their essence and spirit with her "light-winged" presence.',
            likeCount: 11,
        },
        {
            id: 6,
            user: 'person2',
            text: 'A metaphor for someone who is intimately connected to nature and exhibits a light and free-spirited demeanor, akin to the spirits of the forest.',
            likeCount: 11,
        },
        {
            id: 7,
            user: 'person2',
            text: 'A metaphor for someone who is intimately connected to nature and exhibits a light and free-spirited demeanor, akin to the spirits of the forest.',
            likeCount: 11,
        },
        {
            id: 8,
            user: 'person2',
            text: 'A metaphor for someone who is intimately connected to nature and exhibits a light and free-spirited demeanor, akin to the spirits of the forest.',
            likeCount: 11,
        },
        {
            id: 9,
            user: 'person2',
            text: 'A metaphor for someone who is intimately connected to nature and exhibits a light and free-spirited demeanor, akin to the spirits of the forest.',
            likeCount: 11,
        },
    ]

    const renderBackdrop = useCallback(
      (props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={1}
          appearsOnIndex={2}
        />
      ),
      []
    );

    const handleCommentSubmit = () => {
        console.log('submitted')
    }

    return (
      <BottomSheet
        ref={(bottomSheet) => {
          sheetRef.current = bottomSheet;
          if (ref) {
            ref.current = bottomSheet;
          }
        }}
        index={-1}
        snapPoints={["25%", "50%", "75%"]}
        enablePanDownToClose={false}
        handleIndicatorStyle={{ backgroundColor: "#F4F5F4" }}
        backgroundStyle={{ backgroundColor: "#F4F5F4" }}
        backdropComponent={renderBackdrop}
      >
        <View style={styles.contentContainer}>
            <View style={styles.commentsTopRow}>
                <Text style={styles.commentsNumber}>26 comments</Text>
                <TouchableOpacity onPress={props.handleCommentsClose}>
                    <View style={styles.closeComments}>
                        <Ionicons name="close" size={23} color="#644980" />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.commentsTopDivider}></View>

            <BottomSheetScrollView style={styles.commentsScroll}>

            <FlatList
                style={styles.commentsList}
                data={commentData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Comment user={item.user} text={item.text} likeCount={item.likeCount} />
                )}
            />
          </BottomSheetScrollView>

          {/* <InputAccessoryView>
            <View style={styles.inputContainer}>
                <TextInput 
                    value={newComment}
                    placeholder={'Add comment'}
                    onChangeText={setNewComment}
                    style={styles.commentInput}
                    onSubmitEditing={handleCommentSubmit}
                    multiline={true}
                />
            </View>
          </InputAccessoryView> */}

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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get("window").width,
        paddingHorizontal: 20,
    },

    commentsNumber: {
        fontFamily: 'Sarabun-Medium',
        color: '#6C7476'
    },

    closeComments: {
        backgroundColor: '#F7EEFF',
        borderRadius: 100,
        padding: 4,
    },

    commentsTopDivider: {
        width: Dimensions.get("window").width,
        borderBottomColor: '#E2E5E6',
        borderBottomWidth: 1,
        marginTop: 15,
    },

    commentsScroll: {
        backgroundColor: "#F4F5F4",
        width: Dimensions.get("screen").width,
    },

    commentsList: {
        marginTop: 20,
        marginBottom: 90,
    },

    inputContainer: {
        backgroundColor: '#fff'
    },

    commentInput: {
        borderRadius: 100,
        backgroundColor: '#F4F5F4',
        marginHorizontal: 10,
        marginVertical: 10,
        height: 30,
        paddingHorizontal: 10,
    }
  });

  export default CommentSection;