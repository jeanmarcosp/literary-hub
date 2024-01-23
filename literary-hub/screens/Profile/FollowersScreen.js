import React, { useState, useEffect, useCallback, useContext } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Dimensions, FlatList} from "react-native";
import OnboardingMockup from './../../assets/onboarding-images/onboarding-mockup.svg'
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FollowersScreen = () => {
    const [segmentedControlView, setSegmentedControlView] = useState("Collections");
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.topRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back-outline" size={22} color="#373F41" />
                    </TouchableOpacity>

                    <Text style={styles.title}>57 Followers</Text>
                    <Ionicons name="chevron-back-outline" size={22} color="#fff" />
                </View>

                <View style={styles.profile}>
                    <View style={styles.profileInfo}>
                        <View style={styles.profilePic}></View>
                        <View style={styles.text}>
                            <Text style={styles.username}>johndoe</Text>
                            <Text style={styles.name}>John Doe</Text>
                        </View>
                    </View>

                    <TouchableOpacity>
                        <View style={styles.unfollowButton}>
                            <Text style={styles.unfollowButtonText}>Unfollow</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default FollowersScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,

    },

    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },

    title: {
        fontFamily: 'HammersmithOne',
        fontSize: 18,
    },

    profile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
    },

    profilePic: {
        backgroundColor: '#000',
        width: 55,
        height: 55,
        borderRadius: 100,
    },

    text: {
        rowGap: 3,
    },

    username: {
        fontFamily: 'Sarabun-SemiBold',
        fontSize: 18,
    },

    name: {
        fontFamily: 'Sarabun-Regular',
        fontSize: 16,
    },

    unfollowButton: {
        backgroundColor: '#EFEFEF',
        borderRadius: 100,
        paddingHorizontal: 20,
        paddingVertical: 5
    },

    unfollowButtonText: {
        fontFamily: 'Sarabun-SemiBold',
        fontSize: 16,
    }
})