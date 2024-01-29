import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplitScreen from '../screens/none authScreens/split/SplitScreen';
import SignInScreen from '../screens/none authScreens/signin/SignInScreen';
import SignUpScreen from '../screens/none authScreens/signup/SignUpScreen';
import TermsAndConditionsScreen from '../screens/none authScreens/split/TermsAndConditionsScreen';
// import ExplanationScreen from '../screens/none authScreens/Explanation/ExplanationScreen';
// Import other screens as needed

const Stack = createNativeStackNavigator();

const NoneAuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Split" component={SplitScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
      {/* <Stack.Screen name="Explanation" component={ExplanationScreen} /> */}
      {/* Additional screens */}
    </Stack.Navigator>
  );
};

export default NoneAuthNavigator;
