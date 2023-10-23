import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import React from 'react';

const Like = () => {
    return(
        <View style={styles.like}>
            <Ionicons name="heart-outline" size={24} color="black" />
            <Text>10k</Text>
        </View>
        
    )
}

const styles = StyleSheet.create({
    like: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 5,
        padding: 10
    }
})

export default Like;