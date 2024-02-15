import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  FlatList
} from "react-native";
import { React, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import getUserId from "../../hooks/getUserId";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../firebaseConfig";
import * as FileSystem from "expo-file-system";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const EditCollectionScreen = ({route}) => {
  const { collection } = route.params;
  const collectionId = collection._id
  const userId = getUserId();
  const navigation = useNavigation();
  const [title, setTitle] = useState(collection.title);
  const [caption, setCaption] = useState(collection.caption);

  const [coverArt, setCoverArt] = useState(collection.coverArt);
  const [uploading, setUploading] = useState("");
  const [poems, setPoems] = useState([])
  // const [newPoems, setNewPoems] = useState([])
  const [userLikedPoems, setUserLikedPoems] = useState([]);
  const poemIds = collection.poemsInCollection;
  const isAuthor = !collection.username;
  

  useEffect(() => {
    const fetchPoems = async() => {
      try {
        const response = await axios.get(`${ROOT_URL}/poems-by-ids`, {
          params: {
            poemIds: poemIds,
          },
        });
        setPoems(response.data);
        console.log('polar', poems);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPoems();

    const fetchLikedPoems = async () => {
      try { 
        const response = await axios.get(`${ROOT_URL}/users/${userId}/likedPoems`);
        console.log("fetched liked poems")
        setUserLikedPoems(response.data); 
      } catch (error) {
        console.error('Error fetching liked poems:', error);
      }
    };

    fetchLikedPoems();
  }, [poemIds])

  const handleEditCollection = async () => {
    try {

      console.log(newCollection);
    } catch (error) {
      console.error("Error creating collection:", error);
    }
  };

  const handleChangeImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    const source = { uri: result.assets[0].uri };
    setCoverArt(source);
  };

  useEffect(() => {
    if (coverArt && coverArt.uri) {
      handleUploadImage();
    }
  }, [coverArt]);

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
      console.log("url", coverArt);
    } catch (e) {
      console.log(e);
    }
    setUploading(false);
    Alert.alert("Photo uploaded!");
  };

  const handleSave = async() => {

    // save changes to the title
    // save changes to the description
    // save changes to the image
    // save changes to the poems
    console.log("I AM IN SAVE EDITS");
    console.log('title', title);
    console.log('caption', caption);
    updatePoems(poems);
    navigation.goBack();
  }

  
  const updatePoems = async(newPoems) => {
    try {
      const response = await axios.put(`http://localhost:3000/edit/collections/${collection._id}/poems`, {
        newPoems: newPoems.map(poem => poem._id),
        title,
        caption,

      })
      console.log(response.data);
      return response.data
    } catch (error) {
      console.error('Error editing collection poems: ', error);
    }
  }

  const deletePoem = async(poemId) => {
    console.log("this is hte collection id: ", collection._id);
    console.log("this is hte poem id: ", poemId);
    try {
      updatedPoems = poems.filter(poem => poem._id !== poemId);
      setPoems(updatedPoems);      
      // await axios.delete(`http://localhost:3000/collections/${collection._id}/poems/${poemId}`)
      // setPoems(poems.filter(poem => poem._id !==poemId))
    } catch (error) {
      console.log("Error deleting the poem: ", error);
    }

  };

  const PoemName = ({ poem }) => {
    return (
      <TouchableOpacity>
        <View style={styles.poem}>
          <View style={styles.poemInfo}>
          <Text style={styles.poemName}>{poem.title}</Text>
          {!isAuthor && (
            <Text style={styles.poemAuthor}>{poem.author}</Text>
          )}
          </View>
          <TouchableOpacity onPress={() => deletePoem(poem._id)}>
            <Ionicons name="trash-outline" size={28}/>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      
    )
  }

  const PoemList = ({userLikedPoems}) => {
    return (
      <FlatList
        data={poems}
        renderItem={({ item }) => (
          <PoemName poem={item} poemId= {item._id} userLikedPoems={userLikedPoems}/>
        )}
        keyExtractor={(item) => item.id}
        style={styles.poemList}
      />
    );
  };
  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View>
    <View style={styles.editHeader}>
      <TouchableOpacity onPress={handleCancel}>
      <Text style={styles.cancelSaveText}>Cancel</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSave}>
      <Text style={styles.cancelSaveText}>Save</Text>
      </TouchableOpacity>
    </View>
    <KeyboardAwareScrollView
      stickyHeaderIndices={[0]}
    >
    
    <View style={styles.mainContainer}>
      
      <View style={styles.container}>
        <View style={styles.coverPhotoSection}>
          <Text style={styles.header}>Cover photo</Text>
          <View style={styles.emptyCoverPhoto}>
            {!coverArt && (
              <Image source={require('./../../assets/collection-images/default-collection-cover1.jpeg')} style={styles.coverImage} />
            )}

            {coverArt && (
              <Image source={{ uri: coverArt.uri }} style={styles.coverImage} />
            )}
          </View>
          <TouchableOpacity onPress={handleChangeImage}>
            <View style={styles.editPhotoCTA}>
              <Text style={styles.editPhotoText}>Choose Photo</Text>
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
       
        <PoemList userLikedPoems={collection.userLikedPoems}/>

        {/* <TouchableOpacity onPress={handleEditCollection}>
          <View style={styles.createCTA}>
            <Text style={styles.createText}>Save</Text>
          </View>
        </TouchableOpacity> */}
      </View>
      
    </View>
    </KeyboardAwareScrollView>
    </View>
  );
};

export default EditCollectionScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  container: {
    paddingHorizontal: 25,
    marginTop: 5,
    flex:1,
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
  coverImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  poemName: {
    fontFamily: 'HammersmithOne',
    fontSize: 17,
    color: '#373F41'
  },
  poemAuthor: {
    fontFamily: 'Sarabun-Regular',
    fontSize: 15,
    color: '#6C7476'
  },
  poemList: {
    marginTop: 20,
  },

  poem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  poemInfo: {
    flex: 1,
  },

  editHeader: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    backgroundColor: '#644980',
    paddingTop: 60,
    paddingVertical: 10,
  },

  cancelSaveText: {
    color: 'white', // Text color
    fontSize: 18, // Text size
    fontFamily: 'HammersmithOne', // Font family
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#644980',
  },
});
