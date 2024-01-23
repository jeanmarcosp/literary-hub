import React, { useState, useEffect, useCallback, useContext } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Dimensions, FlatList} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Follower from './../../components/Follower.js'

const FollowingScreen = () => {
    const [segmentedControlView, setSegmentedControlView] = useState("Collections");
    const navigation = useNavigation();

    const followers = [
        {
            id: '1'
        },
        {
            id: '2'
        },
        {
            id: '3'
        },
    ]

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.topRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back-outline" size={22} color="#373F41" />
                    </TouchableOpacity>

                    <Text style={styles.title}>57 Following</Text>
                    <Ionicons name="chevron-back-outline" size={22} color="#fff" />
                </View>

                <FlatList
                    style={styles.list}
                    data={followers}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <Follower />
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

export default FollowingScreen

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

    list: {
        marginTop: 20,
    },
})