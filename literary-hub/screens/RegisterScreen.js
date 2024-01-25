import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../state/actions/userActions";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleRegister = async () => {
    try {
      setLoading(true);

      const user = {
        name: name,
        email: email,
        username: username,
        password: password,
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

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <Text style={styles.loginHeader1}>Register for</Text>
        <Text style={styles.loginHeader2}>Literary Hub</Text>

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
    marginTop: 20,
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
    paddingVertical: 5,
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
    marginTop: 60
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
  }
});
