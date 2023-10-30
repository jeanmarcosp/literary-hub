import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import CreateCollection from './CreateCollection';

const Stack = createStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator
        screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="CreateCollectionScreen" component={CreateCollection} />
    </Stack.Navigator>
  );
}