import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppRegistry } from 'react-native';
import BottomNavigationBar from './src/navigation/BottomTabNavigator';

function App() {
  return (
    <NavigationContainer>
      <BottomNavigationBar/>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('main', () => App);

export default App;

