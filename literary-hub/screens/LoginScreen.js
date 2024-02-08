import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LoginScreen = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigation = useNavigation();

  const user = useSelector((state) => state.user); // Use the useSelector hook to access the user data
  const userId = user ? user.id : null; // Extract the user ID
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
      } catch {}
    };
  });

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
    axios
      .post(`${ROOT_URL}/login`, {
        ...user,
      })
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);

        // Dispatch the action to store user information
        dispatch(setUser({ id: response.data.userId, username: null }));
        navigation.navigate("Main");
        setEmail("");
        setPassword("");
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
    <KeyboardAwareScrollView>
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <Text style={styles.loginHeader1}>Sign in to</Text>
        <Text style={styles.loginHeader2}>Literary Hub</Text>
        <View>
          <Text style={styles.sectionHeader}>Email</Text>
          <View style={styles.inputView}>
            <MaterialCommunityIcons
              style={{ marginLeft: 16 }}
              name="email-outline"
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

          <Text style={styles.sectionHeader}>Password</Text>
          <View style={styles.inputView}>
            <MaterialCommunityIcons
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
              style={styles.textBox}
              placeholder="Enter your Password"
            />
          </View>

          <View style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot password</Text>
          </View>
        </View>

        <View>
          <Pressable onPress={handleLogin} style={styles.loginContainer}>
            <Text style={styles.loginText}>Log in</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Register")} style={styles.registerCTA}>
            <Text style={styles.registerCTAText1}>Don't have an account?</Text>
            <Text style={styles.registerCTAText2}>Register</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
    </KeyboardAwareScrollView>
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
    gap: 10,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    paddingVertical: 5,
    borderRadius: 5,
  },

  loginHeader1: {
    fontFamily: "Sarabun-ExtraBold",
    fontSize: 40,
    marginTop: 70,
  },

  loginHeader2: {
    fontFamily: "Sarabun-ExtraBold",
    fontSize: 40,
    marginBottom: 40,
  },

  sectionHeader: {
    fontFamily: 'Sarabun-Bold',
    fontSize: 17,
    marginBottom: 7,
    marginTop: 20,
  },

  loginContainer: {
    width: 332,
    borderRadius: 10,
    backgroundColor: "#000",
    paddingVertical: 18,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
  },

  loginText: {
    textAlign: "center",
    fontFamily: 'Sarabun-Bold',
    fontSize: 18,
    color: "white",
  },

  textBox: {
    marginVertical: 13,
    width: 280,
    fontSize: 16,
    fontFamily: 'Sarabun-Regular',
    color: '#A6A6A6'
  },

  forgotPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 80,
  },

  forgotPasswordText: {
    fontFamily: 'Sarabun-Bold',
    fontSize: 15,
    color: "#9B59D1",
    textDecorationLine: 'underline'
  },

  signUpText: {
    textAlign: "center",
    fontSize: 14,
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
    textDecorationLine: 'underline',
    marginBottom: 250,
  }
});
