import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigationBar from './src/navigation/BottomTabNavigator';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import SplashScreen from './src/screens/SplashScreen';
import AuthNavigation from './src/navigation/AuthNavigation';
import store from './src/redux/store';
import { Provider } from 'react-redux';
import AppRouters from './src/navigation/AppRouters';

const App = () => {
  return (
    <>
      <Provider store={store} >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
          <NavigationContainer>
            <AppRouters/>
          </NavigationContainer>
      </Provider>
    </>
  );
};


export default App;

