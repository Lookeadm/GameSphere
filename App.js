import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import BottomNavigationBar from './src/navigation/BottomTabNavigator';
import LoginScreen from './src/screens/auth/LoginScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <BottomNavigationBar/>
    </NavigationContainer>
  );
}

