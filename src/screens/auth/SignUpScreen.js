import React, { useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputComponent from '../../components/InputComponent';
import { appColors } from '../../constants/appColors';
import { Lock, Sms, User } from 'iconsax-react-native';
import { globalStyles } from '../../styles/globalStyles';
import { ContainerComponent, SectionComponent, TextComponent, RowComponent, ButtonComponent, SpaceComponent } from '../../components';
import { Switch } from 'react-native-gesture-handler';
import SocialLogin from './components/SocialLogin';

const initValue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpScreen = ({ navigation }) => {
  
  const [values, setValues] = useState(initValue);

  const handleChangeValue = (key, value) => {
    const data = {...values}
    data[`${key}`] = value;
    setValues(data);
  };

  return (
    <ContainerComponent isImageBackground isScroll back>
      <SectionComponent>
        <TextComponent size={24} title text="Sign in" />
        <SpaceComponent height={21}/>
        <InputComponent
          value={values.username}
          placeholder="Username"
          onChange={val => handleChangeValue('username',val)}
          allowClear
          affix={<User size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={values.email}
          placeholder="@abc@gamil.com"
          onChange={val => handleChangeValue('email',val)}
          allowClear
          affix={<Sms size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={values.password}
          placeholder="Password"
          onChange={val => handleChangeValue('password',val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={values.confirmPassword}
          placeholder="Confirm Password"
          onChange={val => handleChangeValue('confirmPassword',val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
        />
        
      </SectionComponent>
      <SpaceComponent height={16}/>
      <SectionComponent>
        <ButtonComponent text="SIGN UP" type='primary' />
      </SectionComponent>
      <SocialLogin />
      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Don't have an account?"/>
          <ButtonComponent type="link" text="Sign up" onPress={()=> navigation.navigate('Login')}/>
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default SignUpScreen;
