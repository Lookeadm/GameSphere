import React, { useState } from 'react';
import { View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputComponent from '../components/InputComponent';
import { appColors } from '../constants/appColors';
import { Lock, Sms } from 'iconsax-react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Lưu email vào AsyncStorage
      await AsyncStorage.setItem('userEmail', email);
      console.log('Email saved:', email);
      // Chuyển hướng sau khi đăng nhập thành công
      navigation.navigate('Home');
    } catch (error) {
      console.error('Failed to save email:', error);
    }
  };

  return (
    <View
    style={[
      {alignItems: 'center', justifyContent: 'center', padding: 20}
    ]}>
      <InputComponent
        value={email}
        placeholder="Email"
        onChange={val => setEmail(val)}
        // isPassword
        allowClear
        affix={<Sms size={22} color={appColors.gray}/>}
      />
      <InputComponent
        value={password}
        placeholder="Password"
        onChange={val => setPassword(val)}
        isPassword
        allowClear
        affix={<Lock size={22} color={appColors.gray}/>}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
