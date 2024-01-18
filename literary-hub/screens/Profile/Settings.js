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

const Settings = ({ navigation }) => {
  const userId = getUserId();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(resetUser());
    navigation.navigate("Login");
  };

  const handleDeleteAccount = async () => {
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

  console.log(userId);

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
        <View style={styles.settingBox}>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.settingText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settingBox}>
          <TouchableOpacity onPress={handleDeleteAccount}>
            <Text style={styles.settingText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
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
  },
  closeCTA: {
    backgroundColor: "#F7EEFF",
    borderRadius: 100,
    padding: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  settingBox: {
    marginTop: 16,
    rowGap: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "white",
    borderRadius: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
  settingText: {
    fontSize: 18,
    fontFamily: "Sarabun-Medium",
    color: "#373F41",
  },
});

export default Settings;
