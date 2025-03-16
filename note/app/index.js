import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from "../screen/splash_screen";

const Stack = createStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator initialRouteName="splash">
      <Stack.Screen name="splash" component={SplashScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}