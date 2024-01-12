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

      // const response = await axios.post(`${ROOT_URL}/register`, newUser);
      const response = await axios.post("http://localhost:3000/register", user);

      if (response.data.success) {
        Alert.alert(
          "Registration Successful",
          "You have been registered successfully"
        );

        dispatch(setUser({ id: response.data.userId }));
        navigation.navigate("Main");
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
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Register</Text>
        </View>

        <View style={styles.inputOuterContainer}>
          <View style={styles.inputInnerContainer}>
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="person"
              size={24}
              color="gray"
            />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholderTextColor={"gray"}
              style={styles.textInput}
              placeholder="enter your name"
            />
          </View>
        </View>

        <View style={styles.inputOuterContainer}>
          <View style={styles.inputInnerContainer}>
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={"gray"}
              style={styles.textInput}
              placeholder="enter your email"
            />
          </View>
        </View>

        <View style={styles.inputOuterContainer}>
          <View style={styles.inputInnerContainer}>
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="alternate-email"
              size={24}
              color="gray"
            />
            <TextInput
              value={username}
              onChangeText={(text) => setUsername(text)}
              placeholderTextColor={"gray"}
              style={styles.textInput}
              placeholder="enter your username"
            />
          </View>
        </View>

        <View style={styles.inputOuterContainer}>
          <View style={styles.inputInnerContainer}>
            <MaterialIcons
              style={{ marginLeft: 8 }}
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
              placeholder="enter your password"
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }} />

        <Pressable onPress={handleRegister} style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Register</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.goBack()}
          style={{ marginTop: 15 }}
        >
          <Text style={styles.signInText}>
            Already have an account? Sign In
          </Text>
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
    marginTop: 30,
  },
  inputInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    paddingVertical: 5,
    borderRadius: 5,
  },
  textInput: {
    fontFamily: "HammersmithOne",
    color: "gray",
    marginVertical: 10,
    width: 300,
    fontSize: 14,
  },
  registerButton: {
    width: 200,
    backgroundColor: "#644980",
    padding: 15,
    marginTop: 40,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 6,
  },
  registerButtonText: {
    fontFamily: "HammersmithOne",
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
});
