import "react-native-gesture-handler";
import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import Like from "./Like";
import { useNavigation } from "@react-navigation/native";

const AuthorCard = ({ coverImage, title }) => {
  
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AuthorCollectionScreen')}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <Image source={coverImage} style={styles.image} />
          <Like />
        </View>
        <View>
          <Text
            style={{
              fontFamily: "Sarabun-Regular",
              textAlign: "left",
              textAlignVertical: "center",
              fontSize: 18,
              lineHeight: 28,
              marginTop: 17,
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    
  },
  container: {
    width: 150,
    height: 150,
    padding: 14,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 100,
    padding: 5,
  },
  title: {
    fontFamily: "HammersmithOne",
    display: "flex",
    fontSize: 10,
    color: "#373F41",
    padding: 0,
    lineHeight: 30,
    marginTop: 15,
    textAlign: "left",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default AuthorCard;
