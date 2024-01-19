import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { React, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import getUserId from "../../hooks/getUserId";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../firebaseConfig";
import * as FileSystem from "expo-file-system";

const CreateCollection = () => {
  const userId = getUserId();
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");

  const [coverArt, setCoverArt] = useState("");
  const [uploading, setUploading] = useState("");

  const handleCreateCollection = async () => {
    try {
      const newCollection = {
        userId: userId,
        title: title,
        caption: caption,
        coverArt: coverArt,
      };

      console.log(newCollection);

      // const response = await axios.post(
      //   `${ROOT_URL}/create-collection`,
      //   newCollection
      // );

      const response = await axios.post(
        `http://localhost:3000/create-collection`,
        newCollection
      );
      
      const createdCollection = response.data;
      console.log("Created Collection:", createdCollection);

      navigation.navigate("ProfileScreen");
      setTitle("");
      setCaption("");
      setCoverArt("");
    } catch (error) {
      console.error("Error creating collection:", error);
    }
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    const source = { uri: result.assets[0].uri };
    // console.log(source)
    setCoverArt(source);
  };

  const handleUploadImage = async () => {
    setUploading(true);
    const response = await fetch(coverArt.uri);
    const blob = await response.blob();
    const filename = coverArt.uri.substring(coverArt.uri.lastIndexOf("/") + 1);
    var ref = firebase.storage().ref().child(filename);

    try {
      await ref.put(blob);
      const downloadURL = await ref.getDownloadURL();
      setCoverArt(downloadURL);
      // console.log("Download URL:", coverArt.uri);
    } catch (e) {
      console.log(e);
    }
    setUploading(false);
    Alert.alert("Photo uploaded!");
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>Create new collection</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View style={styles.closeCTA}>
              <Ionicons name="close" size={23} color="#644980" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.coverPhotoSection}>
          <Text style={styles.header}>Cover photo</Text>
          <View style={styles.emptyCoverPhoto}>
            <View style={styles.addCoverPhotoCTA}>
              <Ionicons
                onPress={handlePickImage}
                name="add"
                size={30}
                color="#6C7476"
              />
            </View>
          </View>
          <TouchableOpacity onPress={handleUploadImage}>
            <View style={styles.editPhotoCTA}>
              <Text style={styles.editPhotoText}>Upload Photo</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.nameSection}>
          <View style={styles.nameInfo}>
            <Text style={styles.header}>Name</Text>
            <Text style={styles.headerDescription}>50 characters max</Text>
          </View>
          <TextInput
            style={styles.textInput}
            onChangeText={setTitle}
            value={title}
            placeholder="Enter a collection name"
            maxLength={50}
          />
        </View>

        <View style={styles.nameSection}>
          <View style={styles.nameInfo}>
            <Text style={styles.header}>About</Text>
            <Text style={styles.headerDescription}>50 characters max</Text>
          </View>

          <TextInput
            style={styles.textInput}
            onChangeText={setCaption}
            value={caption}
            placeholder="Enter your collections info"
            maxLength={50}
          />
        </View>

        <TouchableOpacity onPress={handleCreateCollection}>
          <View style={styles.createCTA}>
            <Text style={styles.createText}>Create</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateCollection;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  container: {
    paddingHorizontal: 25,
    paddingTop: 20,
  },

  main: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 25,
    fontFamily: "HammersmithOne",
  },

  closeCTA: {
    backgroundColor: "#F7EEFF",
    borderRadius: 100,
    padding: 4,
  },

  coverPhotoSection: {
    rowGap: 10,
    marginTop: 30,
  },

  header: {
    fontSize: 18,
    fontFamily: "HammersmithOne",
  },

  headerDescription: {
    color: "#9CB5BB",
    fontFamily: "Sarabun-Medium",
    fontSize: 15,
  },

  emptyCoverPhoto: {
    width: 200,
    height: 200,
    backgroundColor: "#F4F5F4",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  addCoverPhotoCTA: {
    borderRadius: 100,
    padding: 3,
    alignSelf: "baseline",
    backgroundColor: "#E2E5E6",
  },

  editPhotoCTA: {
    alignSelf: "baseline",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#E2E5E6",
    backgroundColor: "#F4F5F4",
  },

  editPhotoText: {
    color: "#373F41",
    fontFamily: "HammersmithOne",
    fontSize: 15,
  },

  nameSection: {
    rowGap: 10,
    marginTop: 30,
  },

  nameInfo: {
    rowGap: 3,
  },

  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },

  createCTA: {
    borderRadius: 200,
    alignSelf: "baseline",
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#644980",
    marginTop: 40,
    alignSelf: "center",
  },

  createText: {
    fontSize: 18,
    fontFamily: "HammersmithOne",
    color: "white",
  },
});
