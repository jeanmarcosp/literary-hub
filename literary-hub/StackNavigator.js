import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import ExploreNavigator from "./screens/Explore/ExploreNavigator";
import ProfileNavigator from "./screens/Profile/ProfileNavigator";
import HomeScreen from "./screens/Home-Page/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import OnboardingNavigator from './screens/Onboarding/OnboardingNavigator'
import PoemDetailScreen from './screens/Profile/PoemDetailScreen.js';
import UserDetailScreen from "./screens/UserDetailScreen.js";
import FollowersScreen from "./screens/FollowersScreen.js";
import FollowingScreen from "./screens/FollowingScreen.js";
import CollectionScreen from "./screens/CollectionScreen.js";
import EditCollectionScreen from "./screens/Profile/EditCollection";
import Poem from "./components/Poem";

const StackNavigator = () => {

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator
      initialParams={{ initialScreen: 'Main' }} 
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'white'
        },
      }}
    >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "#644980", fontFamily: 'HammersmithOne', fontSize: 13 },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="ios-home" size={24} color="#644980" />
              ) : (
                <Ionicons name="ios-home-outline" size={24} color="#644980" />
              ),
          }}
        ></Tab.Screen>

        <Tab.Screen
          name="Explore"
          component={ExploreNavigator}
          options={{
            tabBarLabel: "Explore",
            tabBarLabelStyle: { color: "#644980", fontFamily: 'HammersmithOne', fontSize: 13 },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="ios-search-sharp" size={24} color="#644980" />
              ) : (
                <Ionicons name="ios-search-outline" size={24} color="#644980" />
              ),
          }}
        ></Tab.Screen>

        <Tab.Screen
          name="Profile"
          component={ProfileNavigator}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "#644980", fontFamily: 'HammersmithOne', fontSize: 13 },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="ios-person" size={24} color="#644980" />
              ) : (
                <Ionicons name="ios-person-outline" size={24} color="#644980" />
              ),
          }}
        ></Tab.Screen>

      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} options={{ headerShown: false }}/>
        <Stack.Screen name="PoemDetailScreen" component={PoemDetailScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="FollowersScreen" component={FollowersScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="FollowingScreen" component={FollowingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="CollectionScreen" component={CollectionScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="EditCollectionScreen" component={EditCollectionScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SinglePoem" component={Poem} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'white',
  },
});
