import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import ExploreNavigator from "./screens/Explore/ExploreNavigator";
import ProfileNavigator from "./screens/Profile/ProfileNavigator";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function BottomTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#F4F2F6'
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
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#000'
  }
});
