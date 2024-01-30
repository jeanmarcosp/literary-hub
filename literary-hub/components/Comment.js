import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, Dimensions } from "react-native";
import Like from './Like'

const Comment = ({ user, text, likeCount }) => {
    return (
        <View style={styles.container}>
            <View style={styles.userPic}></View>
            <Text style={styles.text}>{text}</Text>
            <View style={styles.likeContainer}>
                <Like />
                <Text style={styles.likeNumber}>{likeCount}</Text>
            </View>
        </View>
    )
}

export default Comment;

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20,
    },

    userPic: {
        width: 40,
        height: 40,
        backgroundColor: '#D9D9D9',
        borderRadius: 100,
    },

    text: {
        width: '70%',
        lineHeight: 20,
        color: '#373F41'
    },

    likeContainer: {
        alignItems: 'center'
    },

    likeNumber: {
        color: '#373F41'
    }
})