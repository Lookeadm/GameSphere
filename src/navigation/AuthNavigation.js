import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import { ForgotPassword, LoginScreen, SignUpScreen, Verication } from '../screens';

const AuthNavigation = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOption={{
                headerShown: false,
            }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="Verication" component={Verication} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
    );
};

export default AuthNavigation