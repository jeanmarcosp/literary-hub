import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../state/actions/userActions";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const user = useSelector((state) => state.user); // Use the useSelector hook to access the user data
  const userId = user ? user.id : null; // Extract the user ID
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
      } catch { }
    };
  });

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
    axios
      .post(`${ROOT_URL}/login`, {
        ... user
      })
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);

        // Dispatch the action to store user information
        dispatch(setUser({ id: response.data.userId, username: null }));
        navigation.navigate("Main");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          Alert.alert("Login error", error.response.data.message);
        } else {
          Alert.alert("Login error", "An error occurred while logging in.");
        }
        console.log("error", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.loginHeader}>Login</Text>
        </View>
        <View>
          <View style={styles.inputView}>
            <MaterialCommunityIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={"gray"}
              style={styles.textBox}
              placeholder="Enter your Email"
            />
          </View>
          <View style={{ marginTop: 30 }}>
            <View style={styles.inputView}>
              <MaterialCommunityIcons
                style={{ marginLeft: 8 }}
                name="lock"
                size={24}
                color="gray"
              />
              <TextInput
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor={"gray"}
                style={styles.textBox}
                placeholder="Enter your Password"
              />
            </View>
          </View>

          <View style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot password</Text>
          </View>
        </View>

        <View>
          <Pressable onPress={handleLogin} style={styles.loginContainer}>
            <Text style={styles.loginText}>Login</Text>
          </Pressable>

          <Pressable>
            <Text style={styles.signUpText}>
              Don't have an account? Sign up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    paddingVertical: 5,
    borderRadius: 5,
  },
  loginHeader: {
    fontFamily: "HammersmithOne",
    fontSize: 30,
    marginTop: 75,
    marginBottom: 30,
  },
  loginContainer: {
    width: 200,
    backgroundColor: "#644980",
    padding: 15,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
  },
  loginText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  textBox: {
    color: "gray",
    marginVertical: 10,
    width: 300,
    fontSize: 16,
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 45,
  },
  forgotPasswordText: {
    fontWeight: "500",
    color: "#007FFF",
  },
  signUpText: {
    textAlign: "center",
    fontSize: 14,
  },
});
