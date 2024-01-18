import React from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from "react-native";
import OnboardingMockup from './../../assets/onboarding-images/onboarding-mockup.svg'
import { Ionicons } from "@expo/vector-icons";

const OnboardingScreen1 = () => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Image style={styles.image} source={OnboardingMockup}/>
                <Text style={styles.title}>Welcome to Literary Hub!</Text>
                <Text style={styles.description}>A place for you to find your love for poetry and incorporate reading poetry into your everyday life!</Text>
                <View>
                    <TouchableOpacity>
                        <View>
                            <Ionicons name="ios-home" size={24} color="#644980" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default OnboardingScreen1

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: '10%',
    },

    image: {

    },

    title: {
        fontFamily: 'Sarabun-ExtraBold',
        fontSize: 25,
    },

    description: {
        fontFamily: 'Sarabun-Regular',
        fontSize: 17,
        marginTop: 20,
        color: '#6E6E6E',
        lineHeight: 25,
        textAlign: 'center',
    }
})