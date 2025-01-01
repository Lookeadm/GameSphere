import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AuthNavigation from './AuthNavigation'
import BottomTabNavigator from './BottomTabNavigator'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { addAuth, authSelector } from '../redux/reducers/authReducer'
import SplashScreen from '../screens/SplashScreen'


const AppRouters = () => {

  const [isShowSplash, setIsShowSplash] = useState(true);
  const {getItem} = useAsyncStorage('auth');
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    checkLogin();
    const timeOut = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);
    return () => clearTimeout(timeOut);  
  }, []);
  
  const checkLogin = async() =>{
    const res = await getItem();

    res && 
      dispatch(
        addAuth(JSON.parse(res)),
      );
  };

  return <>{ isShowSplash ? <SplashScreen/> : auth.token ? <BottomTabNavigator/> : <AuthNavigation/> }</>
}

export default AppRouters;