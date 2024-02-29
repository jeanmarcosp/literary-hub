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
  Button,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
} from "react-native";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import axios from "axios";
import DialogInput from "react-native-dialog-input";
import { Ionicons } from "@expo/vector-icons";

const CollectionBottomSheet = forwardRef((props, ref) => {
  const sheetRef = useRef(null);
  const [collections, setCollections] = useState([]);
  const [isDialogVisible, setDialogVisible] = useState(false);

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
  const showDialog = () => {
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  useEffect(() => {
    if (props.userId) {
      getCollections(props.userId);
    }
  }, [props.userId]);

  const getCollections = () => {
    axios
      .get(`${ROOT_URL}/getcollections`, {
        params: { id: props.userId },
      })
      .then((response) => {
        setCollections(response.data);
      })
      .catch((error) => {
        console.log("Error fetching collections");
      });
  };

  const isPoeminCollection = (poemId, poems) => {
    const isPoemInCollection = poems?.includes(poemId);
    return isPoemInCollection ?? false;
  };
  const handleSubmitNewCollection = (inputText) => {
    const newCollection = {
      userId: props.userId,
      title: inputText,
    };
    console.log(newCollection);
    axios
      .post(`${ROOT_URL}/collection/new`, newCollection)
      .then((response) => {
        console.log("hrer");
        console.log(response);
        addPoemToCollection(props.poem._id, response.data.collection._id);
        closeDialog();
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          Alert.alert("Collection Creation Error", error.response.data.message);
        } else {
          Alert.alert(
            "Collection Creation Error",
            "An error occurred while creating the collection."
          );
        }
        console.log("error", error);
      });
  };

  const addPoemToCollection = (poemId, collectionId) => {
    axios
      .post(`${ROOT_URL}/addpoemtocollection`, {
        poemId: poemId,
        collectionId: collectionId,
      })
      .then((response) => {
        console.log("Poem added to collection:", response.data);
        getCollections();
      })
      .catch((error) => {
        console.log("Error adding poem to collection:", error);
      });
  };

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
      enablePanDownToClose={true}
      handleIndicatorStyle={{ backgroundColor: "#373F41" }}
      backgroundStyle={{ backgroundColor: "white" }}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.containerHeadline}>{props.title}</Text>
        <BottomSheetScrollView
          style={{
            backgroundColor: "white",
            width: Dimensions.get("screen").width,
            marginBottom: 70,
          }}
        >
          <TouchableOpacity style={styles.addToNewbutton} onPress={showDialog}>
            <Ionicons name="copy-outline" size={20} color="#3C3C3C" />
            <Text style={styles.addToNewbuttonText}>Create new collection</Text>
          </TouchableOpacity>

          <DialogInput
            isDialogVisible={isDialogVisible}
            title={"Add to New Collection"}
            hintInput={"Enter collection title"}
            submitInput={(inputText) => handleSubmitNewCollection(inputText)}
            closeDialog={closeDialog}
          />

          {collections.map((collection) => (
            <View key={collection._id}>
              <View style={styles.collectionRow}>
                <View style={styles.collectionMain}>
                  <Image
                    source={{ uri: collection?.coverArt }}
                    style={styles.coverArt}
                  />
                  <View style={styles.collectionInfo}>
                    <Text style={styles.collectionTitle}>{collection.title}</Text>
                    <Text style={styles.collectionLength}>
                      {collection.poemsInCollection.length}{" "}
                      {collection.poemsInCollection.length === 1
                        ? "poem"
                        : "poems"}
                    </Text>
                  </View>
                </View>
                {isPoeminCollection(
                  props.poem._id,
                  collection.poemsInCollection
                ) ? (
                  <TouchableOpacity style={styles.addedButton}>
                    <Ionicons name="checkmark" size={24} color="white" />
                    {props.poem &&
                    collection &&
                    props.poem._id &&
                    collection._id ? (
                      <Text style={styles.addedText}>Added</Text>
                    ) : (
                      <Text style={styles.addedText}>Invalid IDs</Text>
                    )}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                      addPoemToCollection(props.poem._id, collection._id);
                    }}
                  >
                    <Ionicons name="add" size={24} color="#644980" />
                    {props.poem &&
                    collection &&
                    props.poem._id &&
                    collection._id ? (
                      <Text style={styles.addText}>Add</Text>
                    ) : (
                      <Text style={styles.addText}>Invalid IDs</Text>
                    )}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </BottomSheetScrollView>
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
    fontFamily: "HammersmithOne",
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
    color: "#373F41",
  },

  addToNewbutton: {
    flexDirection: 'row',
    columnGap: 10,
    backgroundColor: "#F7F7F7",
    borderColor: '#E1E1E1',
    borderRadius: 10,
    borderWidth: 1.3,
    width: Dimensions.get("window").width - 50,
    paddingVertical: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 30,
  },

  addToNewbuttonText: {
    fontFamily: 'Sarabun-Bold',
    fontSize: 16,
    color: '#3C3C3C'
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'center',
  },

  coverArt: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },

  addText: {
    color: "#644980",
    fontWeight: "bold",
    marginLeft: 5,
  },

  addedText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
  },

  collectionRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },

  collectionMain: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },

  collectionInfo: {
    flexDirection: "column",
    rowGap: 5,
    width: Dimensions.get("window").width * 0.35,
  },

  collectionTitle: {
    fontFamily: "HammersmithOne",
    fontSize: 16,
    fontWeight: "bold",
  },

  collectionLength: {
    fontFamily: "Sarabun-Regular",
    fontSize: 14,
    color: '#6C7476',
  },

  collectionPoems: {
    fontSize: 10,
  },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 3,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderColor: "#644980",
    borderWidth: 1,
  },

  addedButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#644980",
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
});

export default CollectionBottomSheet;
