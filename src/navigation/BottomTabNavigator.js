import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import { ForgotPassword, Verication } from '../screens';
import ProfileScreen from '../screens/ProfileScreen';
import NavigationComponent from '../screens/home/NavigationComponent';
import FileInstall from '../screens/profile/FileInstall';
// import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home stack
const HomeStack = () => (
  <Stack.Navigator
      screenOptions={{
        headerShown: false 
      }}
    >
    <Stack.Screen name="Home" component={HomeScreen}/>
    <Stack.Screen name="Details" component={DetailsScreen}/>
    <Stack.Screen name="Header" component={NavigationComponent}/>
    {/* <Stack.Screen name="Download" component={FileInstall}/> */}
  </Stack.Navigator>
);

// Bottom Tab Navigator
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            Home: focused ? 'home' : 'home-outline',
            Login: focused ? 'log-in' : 'log-in-outline',
            Profile: focused ? 'person' : 'person-outline',
            // Download: focused ? 'download' : 'download-outline',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Header" component={NavigationComponent} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
      {/* <Tab.Screen name="Download" component={FileInstall} options={{ headerShown: false }}/> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
