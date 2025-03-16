import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "../screen/splash_screen";
import { Ionicons } from "@expo/vector-icons";
import Homescreen from "../screen/homescreen";
import NotesScreen from "../screen/NotesScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// function MainTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ color, size }) => {
//           let iconName;
//           if (route.name === "Homescreen") {
//             iconName = "list";
//           } else if (route.name === "Profile") {
//             iconName = "person";
//           }
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//       })}
//     >
//       <Tab.Screen name="Homescreen" component={Homescreen} options={{ headerShown: false }}/>
//     </Tab.Navigator>
//   );
// }

export default function AppNavigator() {
  return (
      <Stack.Navigator initialRouteName="splash">
        <Stack.Screen name="splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="homescreen" component={Homescreen} options={{ headerShown: false }} />
        <Stack.Screen name="notescreen" component={NotesScreen}  options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}
