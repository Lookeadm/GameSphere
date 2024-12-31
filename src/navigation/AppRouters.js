import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AuthNavigation from './AuthNavigation'
import BottomTabNavigator from './BottomTabNavigator'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { addAuth, authSelector } from '../redux/reducers/authReducer'


const AppRouters = () => {

  const {getItem} = useAsyncStorage('auth')
  const auth = useSelector(authSelector);
  const dispatch = useDispatch()

  useEffect(()=>{
    checkLogin();
  }, []);
  
  const checkLogin = async() =>{
    const res = await getItem();

    res && 
      dispatch(
        addAuth(JSON.parse(res)),
      );
  };

  return <>{auth.accesstoken ? <BottomTabNavigator/> : <AuthNavigation/> }</>
}

export default AppRouters;