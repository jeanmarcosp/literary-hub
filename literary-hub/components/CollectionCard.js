import "react-native-gesture-handler";
import { React, useState } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import Like from "./Like";
import { useNavigation } from "@react-navigation/native";

const CollectionCard = ({ coverImage, title, caption, creator }) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CollectionScreen')}>
      <View style={styles.container}>

        <View style={styles.info}>
          <Image source={{
            uri: coverImage,
          }} style={styles.image} />
          <View style={styles.text}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.creator}>{creator}</Text>
            </View>
            <Text style={styles.caption}>{caption}</Text>
          </View>
        </View>

        <View style={styles.rightInfo}>
          <View style={styles.poemNumberTag}>
            <Text style={styles.poemNumberText}>200 poems</Text>
          </View>

          <View style={styles.likes}>
            <Like />
            <Text style={styles.likeNumber}>10k</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },

  container: {
    paddingHorizontal: 13,
    paddingVertical: 15,
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    flexDirection: "row",
    marginBottom: 15,
  },

  info: {
    flexDirection: "row",
    columnGap: 15,
    alignItems: "center",
  },

  text: {
    flexDirection: "column",
    justifyContent: "space-between",
  },

  title: {
    fontFamily:"HammersmithOne",
    fontSize: 18,
    color: "#373F41",
  },

  creator: {
    fontFamily: "Sarabun-Regular",
    fontSize: 16,
    color: "gray",
  },
  
  caption: {
    fontFamily: "Sarabun-Regular",
    fontSize: 15,
    color: "#373F41",
  },

  rightInfo: {
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },

  poemNumberTag: {
    borderWidth: 1,
    borderColor: '#D6CEDF',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#F9F3FF',
  },

  poemNumberText: {
    fontFamily: 'Sarabun-SemiBold',
    color: '#774BA3'
  },

  likes: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 3,
  },

  likeNumber: {

  }
});

export default CollectionCard;
