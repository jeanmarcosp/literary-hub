import React, { useState, useEffect, useCallback, useContext } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Dimensions, FlatList} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Follower = () => {
    return (
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
    )
}

export default Follower;

const styles = StyleSheet.create({
    profile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
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