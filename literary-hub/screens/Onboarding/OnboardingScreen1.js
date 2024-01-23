import React from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Dimensions } from "react-native";
import OnboardingMockup from './../../assets/onboarding-images/onboarding-mockup.svg'
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const OnboardingScreen1 = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.progressBar}>
                    <View style={styles.progressBarItemFilled}></View>
                    <View style={styles.progressBarItemUnfilled}></View>
                    <View style={styles.progressBarItemUnfilled}></View>
                    <View style={styles.progressBarItemUnfilled}></View>
                </View>
                <Image style={styles.image} source={require('./../../assets/onboarding-images/onboarding-mockup.jpg')}/>
                <View style={styles.text}>
                    <Text style={styles.title}>Welcome to Literary Hub!</Text>
                    <Text style={styles.description}>A place for you to find your love for poetry and incorporate reading poetry into your everyday life!</Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity></TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('OnboardingScreen2')}>
                        <View style={styles.nextButton}>
                            <Ionicons name="arrow-forward-outline" size={24} color="#FFFFFF" />
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
        position: 'relative',
        height: '100%',
    },

    progressBar: {
        flexDirection: 'row',
        width: '100%',
        columnGap: 10,
        marginTop: 20,
    },

    progressBarItemFilled: {
        flex: 1,
        height: 4,
        backgroundColor: '#393939',
    },

    progressBarItemUnfilled: {
        flex: 1,
        height: 4,
        backgroundColor: '#D9D9D9',
    },

    image: {
        width: 200,
        height: 300,
        position: 'absolute',
        top: 100,
    },

    text: {
        alignItems: 'center',
        position: 'absolute',
        top: 450,
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
    },

    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        position: 'absolute',
        bottom: 30,
    },

    backButton: {
        backgroundColor: '#F2E3FF',
        borderRadius: 100,
        padding: 17,
    },

    nextButton: {
        backgroundColor: '#9B59D1',
        borderRadius: 100,
        padding: 17,
    },
})