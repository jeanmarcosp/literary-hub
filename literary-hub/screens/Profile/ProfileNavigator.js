import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import CreateCollection from './CreateCollection';
import Settings from './Settings';

const Stack = createStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator
        screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="CreateCollectionScreen" component={CreateCollection} />
      <Stack.Screen name="SettingsScreen" component={Settings} />
    </Stack.Navigator>
  );
}