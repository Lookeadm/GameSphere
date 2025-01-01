import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { ForgotPassword, LoginScreen, SignUpScreen, Verication } from '../screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const AuthNavigation = () => {
    
    const [isExistingUser, setIsExistingUser] = useState(false);

    useEffect(()=>{
        checkUserExisting()
    }, []);

    const checkUserExisting = async () => {
        const res = await AsyncStorage.getItem('auth');

        res && setIsExistingUser(true);
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            {/* {!isExistingUser&&(
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
            )} */}
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="Verication" component={Verication} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ProflieScreen" component={ProfileScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigation