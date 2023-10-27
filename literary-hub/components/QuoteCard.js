import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { React, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const QuoteCard = ({ poemId, quote }) => {
  const [saved, setSaved] = useState(true);

  return (
    <View style={styles.savedQuote}>
      <Text style={styles.savedQuoteText}>"{quote}"</Text>
      <View style={styles.savedQuoteCTAs}>
        <TouchableOpacity>
          <View style={styles.viewPoem}>
            <Text style={styles.viewPoemText}>View poem</Text>
            <Ionicons name="chevron-forward" size={17} color="black" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSaved(!saved)}>
          {saved ? (
            <Ionicons name="bookmark" size={25} color="black" />
          ) : (
            <Ionicons name="bookmark-outline" size={25} color="black" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuoteCard;

const styles = StyleSheet.create({
  savedQuote: {
    width:370,
    rowGap: 10,
    marginTop:10,
    marginBottom: 10,
    marginLeft:10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "white",
    borderRadius: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },

  savedQuoteText: {
    fontSize: 16,
    fontFamily: "PromptRegular",
    color: "#373F41",
  },

  savedQuoteCTAs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  viewPoem: {
    flexDirection: "row",
  },

  viewPoemText: {
    fontFamily: "PromptRegular",
    fontSize: 13,
    color: "#373F41",
  },
});
