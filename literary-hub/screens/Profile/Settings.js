import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { resetUser } from "../../state/actions/userActions";
import getUserId from "../../hooks/getUserId";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = ({ navigation }) => {
  const userId = getUserId();
  const dispatch = useDispatch();

  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      console.log("Authentication token cleared successfully");
    } catch (error) {
      console.error("Error clearing authentication token:", error);
    }
  };

  const handleLogout = () => {
    clearAuthToken();
    dispatch(resetUser());
    navigation.navigate("Login");
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete", onPress: deleteConfirmed }
      ]
    );
  };
  
  const deleteConfirmed = async () => {
    try {
      const response = await axios.delete(`${ROOT_URL}/delete-account/${userId}`);
  
      if (response.data.success) {
        Alert.alert(
          "Deletion Successful",
          "Your account has been deleted successfully"
        );
  
        dispatch(resetUser());
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      Alert.alert(
        "Deletion Failed",
        "An error occurred during account deletion"
      );
    }
  };
  

  // console.log(userId);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>Settings</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View style={styles.closeCTA}>
              <Ionicons name="close" size={23} color="#644980" />
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.settingBox}>
              <Ionicons name="exit-outline" size={24} color="#464646" />
              <Text style={styles.settingText}>Log out</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDeleteAccount}>
          <View style={styles.settingBox}>
              <Ionicons name="trash-outline" size={24} color="#FB4E4E" />
              <Text style={styles.redSettingText}>Delete account</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  container: {
    paddingHorizontal: 25,
    paddingTop: 20,
  },

  main: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  closeCTA: {
    backgroundColor: "#F7EEFF",
    borderRadius: 100,
    padding: 4,
  },

  title: {
    fontFamily: 'Sarabun-ExtraBold',
    fontSize: 24,
    textAlign: "center",
  },

  settingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 15,
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DEDEDE',
  },

  settingText: {
    fontSize: 18,
    fontFamily: "Sarabun-Bold",
    color: "#464646",
  },

  redSettingText: {
    fontSize: 18,
    fontFamily: "Sarabun-Bold",
    color: "#FB4E4E",
  },
});

export default Settings;
