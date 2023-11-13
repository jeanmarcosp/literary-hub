import "react-native-gesture-handler";
import {React} from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Like from "./Like";

const PoemCard = ({ title, author, excerpt, likes }) => {

  const likeText = likes === 1 ? "like" : "likes";
  timeEstimate = Math.ceil(excerpt.length / 200)

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.container}>

        <View style={styles.leftInfo}>
          <View style={styles.mainInfo}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.author}>by {author}</Text>
          </View>
          <Text style={styles.excerpt} numberOfLines={2} ellipsizeMode='tail'>{excerpt.split('\n').slice(0, 2).join('\n')}</Text>
        </View>

        <View style={styles.rightInfo}>
          <View style={styles.poemLengthTag}>
            <Text style={styles.poemLengthText}>{timeEstimate} min</Text>
          </View>

          <View style={styles.likes}>
            <Like />
            <Text style={styles.likeNumber}>{likes} {likeText}</Text>
          </View>
        </View>

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 18,
    paddingVertical: 18,
    backgroundColor: "white",
    borderRadius: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },

  leftInfo: {
    flexDirection: "column",
    width: '80%',
  },

  mainInfo: {
    rowGap: 2,
  },

  title: {
    fontFamily: "Sarabun-Bold",
    fontSize: 18,
    color: "#373F41",
  },

  author: {
    fontFamily: "Sarabun-Regular",
    fontSize: 15,
    color: "grey",
  },

  excerpt: {
    fontFamily: "Sarabun-Regular",
    fontSize: 14,
    color: "#373F41",
    marginTop: 10,
  },

  rightInfo: {
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },

  poemLengthTag: {
    borderWidth: 1,
    borderColor: '#D6CEDF',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#F9F3FF',
  },

  poemLengthText: {
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

export default PoemCard;
