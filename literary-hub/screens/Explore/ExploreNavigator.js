import { createStackNavigator } from "@react-navigation/stack";
import ExploreScreen from "./ExploreScreen";
import CollectionScreen from "../CollectionScreen";
import PoemScreen from "./PoemScreen";
import Poem from "../../components/Poem";
import UserDetailScreen from "../UserDetailScreen"

const Stack = createStackNavigator();

console.log("navigated")

export default function ExploreNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
      <Stack.Screen name="SinglePoem" component={Poem} />
      <Stack.Screen name="Poem" component={PoemScreen} />
      <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} />
    </Stack.Navigator>
  );
}
