import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import store from './src/redux/store';
import { Provider } from 'react-redux';
import AppRouters from './src/navigation/AppRouters';
import { DownloadContext } from './src/context/';


const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#161616',
    text: '#FFFFFF',
    card: '#000000',
    border: '#333333',
    primary: '#FFFFFF',
  },
};

const App = () => {
  return (
    <>
      <Provider store={store} >
      <StatusBar
        style="light"  // Đổi thành light cho dark theme
        backgroundColor="transparent"
        translucent
      />
          <NavigationContainer theme={MyTheme}>
            <AppRouters/>

          </NavigationContainer>
      </Provider>
    </>
  );
};


export default App;

