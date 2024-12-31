import React, { useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputComponent from '../../components/InputComponent';
import { appColors } from '../../constants/appColors';
import { Lock, Sms } from 'iconsax-react-native';
import { globalStyles } from '../../styles/globalStyles';
import { ContainerComponent, SectionComponent, TextComponent, RowComponent, ButtonComponent, SpaceComponent } from '../../components';
import { Switch } from 'react-native-gesture-handler';
import SocialLogin from './components/SocialLogin';
import authenticationAPI from '../../apis/authApi';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);

  const handleLogin = async () => {
    try{
      const res = await authenticationAPI.HandleAuthentication('/users');
      console.log(res);
    }catch(e){

    }
  }

  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
      </SectionComponent>

      <SectionComponent>
        <TextComponent size={24} title text="Sign in" />
        <SpaceComponent height={16}/>
        <InputComponent
          value={email}
          placeholder="Email"
          onChange={val => setEmail(val)}
          // isPassword
          allowClear
          affix={<Sms size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={password}
          placeholder="Password"
          onChange={val => setPassword(val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
        />
        <RowComponent justify="space-between">
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch
              trackColor={{ true: appColors.primary }}
              thumbColor={appColors.white}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)} 
              />
            <TextComponent text="Remember me" />
          </RowComponent>
          <ButtonComponent
            text="Forgot Password?"
            onPress={() => navigation.navigate('ForgotPassword')}
            type="text" 
            />
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={16}/>
      <SectionComponent>
        <ButtonComponent onPress={handleLogin} text="SIGN IN" type='primary' />
      </SectionComponent>
      <SocialLogin />
      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Don't have an account?"/>
          <ButtonComponent type="link" text="Sign up" onPress={()=>navigation.navigate('SignUpScreen')}/>
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
