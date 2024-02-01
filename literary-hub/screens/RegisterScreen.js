import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Image, 
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect,  } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../state/actions/userActions";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../firebaseConfig";
// import * as filesystem from filesystem

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [profilePicture, setProfilePicture] = useState(null);
  const [uploading, setUploading] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const isInputValid = () => {
    // Check if any of the required fields are empty
    if (!name || !email || !username || !password) {
      Alert.alert("Incomplete Information", "Please fill in all the fields");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    try {
      setLoading(true);

      if (!isInputValid()) {
        // If the input is not valid, don't proceed with registration
        return;
      }

      const user = {
        name: name,
        email: email,
        username: username,
        password: password,
        profilePicture: profilePicture,
      };

      const response = await axios.post(`${ROOT_URL}/register`, user);

      if (response.data.success) {
        Alert.alert(
          "Registration Successful",
          "You have been registered successfully"
        );

        dispatch(setUser({ id: response.data.userId }));
        navigation.navigate("Onboarding");
      } else {
        Alert.alert("Registration Failed", response.data.message);
      }

      setName("");
      setEmail("");
      setUsername("");
      setPassword("");
      setProfilePicture(null)
    } catch (error) {
      console.error("Error during registration:", error);
      Alert.alert(
        "Registration Failed",
        "An error occurred during registration"
      );
    } finally {
      setLoading(false);
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
    setProfilePicture(source);
  };

  useEffect(() => {
    if (profilePicture && profilePicture.uri) {
      handleUploadImage();
    }
  }, [profilePicture]);

  const handleUploadImage = async () => {
    setUploading(true);
    const response = await fetch(profilePicture.uri);
    const blob = await response.blob();
    const filename = profilePicture.uri.substring(profilePicture.uri.lastIndexOf("/") + 1);
    var ref = firebase.storage().ref().child(filename);

    try {
      await ref.put(blob);
      const downloadURL = await ref.getDownloadURL();
      setProfilePicture(downloadURL);
      console.log("url", profilePicture);
    } catch (e) {
      console.log(e);
    }
    setUploading(false);
    Alert.alert("Photo uploaded!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <Text style={styles.loginHeader1}>Create an account</Text>
        {/* <Text style={styles.loginHeader2}>Literary Hub</Text> */}

        <View style={styles.coverPhotoSection}>
          <View style={styles.emptyCoverPhoto}>
            {profilePicture && (
              <Image source={{ uri: profilePicture.uri }} style={styles.coverImage} />
            )}
          </View>
          <TouchableOpacity onPress={handlePickImage}>
            <View style={styles.editPhotoCTA}>
              <Text style={styles.editPhotoText}>Choose Profile Picture</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inputOuterContainer}>
          <Text style={styles.sectionHeader}>Name</Text>
          <View style={styles.inputInnerContainer}>
            <MaterialIcons
              style={{ marginLeft: 16 }}
              name="person-outline"
              size={24}
              color="gray"
            />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholderTextColor={"gray"}
              style={styles.textInput}
              placeholder="Enter name"
            />
          </View>
        </View>

        <View style={styles.inputOuterContainer}>
          <Text style={styles.sectionHeader}>Email</Text>
          <View style={styles.inputInnerContainer}>
            <MaterialIcons
              style={{ marginLeft: 16 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={"gray"}
              style={styles.textInput}
              placeholder="Enter email"
            />
          </View>
        </View>

        <View style={styles.inputOuterContainer}>
          <Text style={styles.sectionHeader}>Username</Text>
          <View style={styles.inputInnerContainer}>
            <MaterialIcons
              style={{ marginLeft: 16 }}
              name="alternate-email"
              size={24}
              color="gray"
            />
            <TextInput
              value={username}
              onChangeText={(text) => setUsername(text)}
              placeholderTextColor={"gray"}
              style={styles.textInput}
              placeholder="Enter username"
            />
          </View>
        </View>

        <View style={styles.inputOuterContainer}>
          <Text style={styles.sectionHeader}>Password</Text>
          <View style={styles.inputInnerContainer}>
            <MaterialIcons
              style={{ marginLeft: 16 }}
              name="lock-outline"
              size={24}
              color="gray"
            />
            <TextInput
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor={"gray"}
              style={styles.textInput}
              placeholder="Enter password"
            />
          </View>
        </View>

        <Pressable onPress={handleRegister} style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Register</Text>
        </Pressable>

        <Pressable onPress={() => navigation.goBack()} style={styles.registerCTA}>
          <Text style={styles.registerCTAText1}>Already have an account?</Text>
          <Text style={styles.registerCTAText2}>Log in</Text>
        </Pressable>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },

  loginHeader1: {
    fontFamily: "Sarabun-ExtraBold",
    fontSize: 40,
    marginTop: 30,
  },

  loginHeader2: {
    fontFamily: "Sarabun-ExtraBold",
    fontSize: 40,
    marginBottom: 0,
  },

  headerContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  
  headerText: {
    fontFamily: "HammersmithOne",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 25,
  },

  inputOuterContainer: {
    marginTop: 15,
  },

  sectionHeader: {
    fontFamily: 'Sarabun-Bold',
    fontSize: 17,
    marginBottom: 7,
  },

  inputInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    paddingVertical: 2,
    borderRadius: 5,
  },

  textInput: {
    fontFamily: "Sarabun-Regular",
    color: "gray",
    marginVertical: 13,
    width: 280,
    fontSize: 16,
  },

  registerButton: {
    width: 332,
    borderRadius: 10,
    backgroundColor: "#000",
    paddingVertical: 18,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
    marginTop: 35,
  },

  registerButtonText: {
    fontFamily: 'Sarabun-Bold',
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },

  signInText: {
    fontFamily: "HammersmithOne",
    textAlign: "center",
    fontSize: 15,
  },

  registerCTA: {
    flexDirection: 'row',
    columnGap: 3,
    alignItems: 'baseline',
    alignSelf: 'center',
    marginTop: 10
  },

  registerCTAText1: {
    fontFamily: 'Sarabun-Regular',
    fontSize: 17,
    color: '#9B59D1',
  },

  registerCTAText2: {
    fontFamily: 'Sarabun-Bold',
    fontSize: 17,
    color: '#9B59D1',
    textDecorationLine: 'underline'
  },
  coverPhotoSection: {
    rowGap: 10,
    marginTop: 20,
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
    width: 100,
    height: 100,
    backgroundColor: "#F4F5F4",
    borderRadius: 100,
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
  coverImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
});
