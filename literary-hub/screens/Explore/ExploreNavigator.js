import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from './ExploreScreen';
import AuthorCollectionScreen from './AuthorCollectionScreen';
import CollectionScreen from './Collection';

const Stack = createStackNavigator();

export default function ExploreNavigator() {
  return (
    <Stack.Navigator
        screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
      <Stack.Screen name="AuthorCollectionScreen" component={AuthorCollectionScreen} />
      <Stack.Screen name="CollectionScreen" component={CollectionScreen} />
    </Stack.Navigator>
  );
}