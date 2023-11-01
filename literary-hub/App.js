import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./StackNavigator";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import {
  Prompt_400Regular,
  Prompt_500Medium,
  Prompt_600SemiBold,
} from "@expo-google-fonts/prompt";
//import { UserContext } from './UserContext';
import { Provider } from "react-redux";
import store from "./state/store";
import { useSelector, useDispatch } from 'react-redux';


export default function App() {

  global.ROOT_URL = 'https://literary-hub-backend.onrender.com'

  let [fontsLoaded] = useFonts({
    Inter_900Black,
    PromptRegular: Prompt_400Regular,
    PromptMedium: Prompt_500Medium,
    PromptSemiBold: Prompt_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
