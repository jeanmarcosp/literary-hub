import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from "../assets/logo-black.png"

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPasssword] = useState("");
    const navigation = useNavigation();
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
            } catch {

            }
        }
    })
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <View style={{ marginTop: 50 }}>
                <Image
                    style={{ width: 150, height: 100, resizeMode: "contain" }}
                    source={logo}
                />
            </View>
            <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 15 , justifyContent:'center'}}>Lit Hub</Text>
            <KeyboardAvoidingView>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 25 }}>Login to Your Account</Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})