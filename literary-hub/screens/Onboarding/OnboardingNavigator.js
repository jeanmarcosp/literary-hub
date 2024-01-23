import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen1 from './OnboardingScreen1'
import OnboardingScreen2 from './OnboardingScreen2'
import OnboardingScreen3 from './OnboardingScreen3'
import OnboardingScreen4 from './OnboardingScreen4'

const Stack = createStackNavigator();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: {backgroundColor: '#fff'}
        }}
    >
      <Stack.Screen name="OnboardingScreen1" component={OnboardingScreen1} />
      <Stack.Screen name="OnboardingScreen2" component={OnboardingScreen2} />
      <Stack.Screen name="OnboardingScreen3" component={OnboardingScreen3} />
      <Stack.Screen name="OnboardingScreen4" component={OnboardingScreen4} />
    </Stack.Navigator>
  );
}