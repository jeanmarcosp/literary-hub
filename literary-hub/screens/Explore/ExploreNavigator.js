import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from './ExploreScreen';
import CollectionScreen from './Collection';
import PoemScreen from './PoemScreen';

const Stack = createStackNavigator();

export default function ExploreNavigator() {
  return (
    <Stack.Navigator
        screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
      <Stack.Screen name="CollectionScreen" component={CollectionScreen} />
      <Stack.Screen name="Poem" component={PoemScreen} />
    </Stack.Navigator>
  );
}