import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from "../assets/logo-purple.png"


const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
            } catch {

            }
        }
    })
    const handleLogin = () => {
        const user = {
            email: email,
            password: password,
        };
        axios
            .post("http://localhost:3000/login", user).then((response) => {
                console.log(response);
                const token = response.data.token;
                AsyncStorage.setItem("authToken", token);
                navigation.navigate("Main");
            }).catch((error) => {
                if (error.response && error.response.data) {
                    Alert.alert("Login error", error.response.data.message);
                } else {
                    Alert.alert("Login error", "An error occurred while logging in.");
                }
                console.log("error", error);
            })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <View style={{ marginTop: 50 }}>
                {/* <Image
                    style={{ width: 150, height: 100, resizeMode: "contain" }}
                    source={logo}
                /> */}
            </View>
            <KeyboardAvoidingView>
                <View style={{ alignItems: 'center', justifyContent: "center" }}>
                    <Text style={{ fontFamily: 'Inter_900Black', fontSize: 30, fontWeight: "bold", marginTop: 25 }}>Login</Text>
                </View>
                <View style={{ marginTop: 40 }}>
                    <View style={styles.inputView}>
                        <MaterialCommunityIcons style={{ marginLeft: 8 }} name="email" size={24} color="gray" />
                        <TextInput
                            autoCapitalize='none'
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholderTextColor={"gray"}
                            marg
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: email ? 16 : 16
                            }}
                            placeholder='Enter your Email' />
                    </View>
                    <View style={{ marginTop: 30 }}>

                        <View style={styles.inputView}>
                            <MaterialCommunityIcons style={{ marginLeft: 8 }} name="lock" size={24} color="gray" />
                            <TextInput
                                secureTextEntry={true}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                placeholderTextColor={"gray"}
                                style={{
                                    color: "gray",
                                    marginVertical: 10,
                                    width: 300,
                                    fontSize: password ? 16 : 16
                                }}
                                placeholder='Enter your Password' />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
                        <Text style={{ flex: 0, fontWeight: "500", color: "#007FFF" }}>Forgot password</Text>
                    </View>


                </View>

                <View style={{ marginTop: 45 }}>
                    <Pressable
                        onPress={handleLogin}
                        style={{ width: 200, backgroundColor: "#644980", padding: 15, marginLeft: "auto", marginRight: "auto" }}>
                        <Text
                            style={
                                {
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    fontSize: 16,
                                    color: "white"
                                }}>
                            Login
                        </Text>
                    </Pressable>

                    <Pressable style={{ marginTop: 10 }}>
                        <Text style={{ textAlign: "center", fontSize: 14 }}>
                            Don't have an account? Sign up
                        </Text>
                    </Pressable>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    inputView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        borderColor: "#D0D0D0",
        borderWidth: 1,
        paddingVertical: 5,
        borderRadius: 5,
    }
})