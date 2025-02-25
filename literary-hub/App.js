import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./StackNavigator";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './state/store';

export default function App() {
  global.ROOT_URL = "https://literary-hub-backend.onrender.com";

  const [fontsLoaded] = useFonts({
    HammersmithOne: require("./assets/fonts/HammersmithOne-Regular.ttf"),
    "Sarabun-Bold": require("./assets/fonts/Sarabun-Bold.ttf"),
    "Sarabun-ExtraBold": require("./assets/fonts/Sarabun-ExtraBold.ttf"),
    "Sarabun-ExtraLight": require("./assets/fonts/Sarabun-ExtraLight.ttf"),
    "Sarabun-Light": require("./assets/fonts/Sarabun-Light.ttf"),
    "Sarabun-Medium": require("./assets/fonts/Sarabun-Medium.ttf"),
    "Sarabun-Regular": require("./assets/fonts/Sarabun-Regular.ttf"),
    "Sarabun-SemiBold": require("./assets/fonts/Sarabun-SemiBold.ttf"),
    "Sarabun-Thin": require("./assets/fonts/Sarabun-Thin.ttf"),
    "Sarabun-BoldItalic": require("./assets/fonts/Sarabun-BoldItalic.ttf"),
    "Sarabun-ExtraBoldItalic": require("./assets/fonts/Sarabun-ExtraBoldItalic.ttf"),
    "Sarabun-ExtraLightItalic": require("./assets/fonts/Sarabun-ExtraLightItalic.ttf"),
    "Sarabun-LightItalic": require("./assets/fonts/Sarabun-LightItalic.ttf"),
    "Sarabun-MediumItalic": require("./assets/fonts/Sarabun-MediumItalic.ttf"),
    "Sarabun-SemiBoldItalic": require("./assets/fonts/Sarabun-SemiBoldItalic.ttf"),
    "Sarabun-ThinItalic": require("./assets/fonts/Sarabun-ThinItalic.ttf"),
    "Sarabun-Italic": require("./assets/fonts/Sarabun-Italic.ttf"),
    "OpenDyslexicBold": require("./assets/fonts/OpenDyslexic-Bold.otf"),
    "OpenDyslexicBoldItalic": require("./assets/fonts/OpenDyslexic-BoldItalic.otf"),
    "OpenDyslexicItalic": require("./assets/fonts/OpenDyslexic-Italic.otf"),
    "OpenDyslexicRegular": require("./assets/fonts/OpenDyslexic-Regular.otf"),
    "OpenDyslexicAltaBoldItalic": require("./assets/fonts/OpenDyslexicAlta-BoldItalic.otf"),
    "OpenDyslexicAltaBoldItalic": require("./assets/fonts/OpenDyslexicAlta-Bold.otf"),
    "OpenDyslexicAltaItalic": require("./assets/fonts/OpenDyslexicAlta-Italic.otf"),
    "OpenDyslexicAltaRegular": require("./assets/fonts/OpenDyslexicAlta-Regular.otf"),
    "OpenDyslexicMonoRegular": require("./assets/fonts/OpenDyslexicMono-Regular.otf"),
    "SFNSText-Bold": require("./assets/fonts/SFNSText-Bold.otf"),
    "SFNSText-BoldItalic": require("./assets/fonts/SFNSText-BoldItalic.otf"),
    "SFNSText-Heavy": require("./assets/fonts/SFNSText-Heavy.otf"),
    "SFNSText-HeavyItalic": require("./assets/fonts/SFNSText-HeavyItalic.otf"),
    "SFNSText-Light": require("./assets/fonts/SFNSText-Light.otf"),
    "SFNSText-LightItalic": require("./assets/fonts/SFNSText-LightItalic.otf"),
    "SFNSText-Medium": require("./assets/fonts/SFNSText-Medium.otf"),
    "SFNSText-MediumItalic": require("./assets/fonts/SFNSText-MediumItalic.otf"),
    "SFNSText-Regular": require("./assets/fonts/SFNSText-Regular.otf"),
    "SFNSText-RegularItalic": require("./assets/fonts/SFNSText-RegularItalic.otf"),
    "SFNSText-Semibold": require("./assets/fonts/SFNSText-Semibold.otf"),
    "SFNSText-SemiboldItalic": require("./assets/fonts/SFNSText-SemiboldItalic.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StackNavigator />
        </GestureHandlerRootView>
      </PersistGate>
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
