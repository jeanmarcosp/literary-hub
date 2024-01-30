import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import CreateCollection from './CreateCollection';
import Settings from './Settings';
import FollowersScreen from '../FollowersScreen'
import FollowingScreen from '../FollowingScreen'

const Stack = createStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#fff'}
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="CreateCollectionScreen" component={CreateCollection} />
      <Stack.Screen name="SettingsScreen" component={Settings} />
      <Stack.Screen name="FollowersScreen" component={FollowersScreen} />
      <Stack.Screen name="FollowingScreen" component={FollowingScreen} />
    </Stack.Navigator>
  );
}