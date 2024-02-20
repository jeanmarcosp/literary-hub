import { React } from "react";
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    StyleSheet,
    Modal,
    Alert,
  } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ShareMenu = ({ isVisible, children, onClose }) => {
    return (
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>Collection Actions</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {children}
        </View>
      </Modal>
    );
  };

  export default ShareMenu;

  const styles = StyleSheet.create({
    modalContent: {
        height: "25%",
        width: "100%",
        backgroundColor: "white",
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: "absolute",
        bottom: 0,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
    },
    
    modalTitleContainer: {
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 20,
        backgroundColor: "white",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    modalTitle: {
        color: "black",
        fontSize: 18,
        fontFamily: "HammersmithOne",
    },
  })