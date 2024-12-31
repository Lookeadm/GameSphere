import React, { useEffect, useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputComponent from '../../components/InputComponent';
import { appColors } from '../../constants/appColors';
import { Lock, Sms, User } from 'iconsax-react-native';
import { globalStyles } from '../../styles/globalStyles';
import { ContainerComponent, SectionComponent, TextComponent, RowComponent, ButtonComponent, SpaceComponent } from '../../components';
import { Switch } from 'react-native-gesture-handler';
import SocialLogin from './components/SocialLogin';
import { LoadingModal } from '../../modals';
import authenticationAPI from '../../apis/authApi';
import { Validate } from '../../utils/validate';
import { addAuth } from '../../redux/reducers/authReducer';

const initValue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpScreen = ({ navigation }) => {

  const [values, setValues] = useState(initValue);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(()=>{
    if(values.email || values.password){
      setErrorMessage('');
    }
  }, [values.email, values.password]);

  const handleChangeValue = (key, value) => {
    const data = { ...values }
    data[`${key}`] = value;
    setValues(data);
  };

  const handleRegister = async () => {

    const { email, password, confirmPassword } = values

    const emailValidation = Validate.email(email)
    const passwordValidation = Validate.Password(password)

    if (email && password && confirmPassword) {
      if(emailValidation && passwordValidation){
        setErrorMessage('');
        setIsLoading(true);
        try {
          const res = await authenticationAPI.HandleAuthentication('/register', values, 'post')
          dispatch(addAuth(res.data));
          await AsyncStorage.setItem('auth', JSON.stringify(res.data))
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      }else{
        setErrorMessage('Invalid Email')
      }
    } else {
      setErrorMessage('Please enter information')
    }

  }

  return (
    <>
      <ContainerComponent isImageBackground isScroll back>
        <SectionComponent>
          <TextComponent size={24} title text="Sign in" />
          <SpaceComponent height={21} />
          <InputComponent
            value={values.username}
            placeholder="Username"
            onChange={val => handleChangeValue('username', val)}
            allowClear
            affix={<User size={22} color={appColors.gray} />}
          />
          <InputComponent
            value={values.email}
            placeholder="@abc@gamil.com"
            onChange={val => handleChangeValue('email', val)}
            allowClear
            affix={<Sms size={22} color={appColors.gray} />}
          />
          <InputComponent
            value={values.password}
            placeholder="Password"
            onChange={val => handleChangeValue('password', val)}
            isPassword
            allowClear
            affix={<Lock size={22} color={appColors.gray} />}
          />
          <InputComponent
            value={values.confirmPassword}
            placeholder="Confirm Password"
            onChange={val => handleChangeValue('confirmPassword', val)}
            isPassword
            allowClear
            affix={<Lock size={22} color={appColors.gray} />}
          />

        </SectionComponent>

        {errorMessage && (
          <SectionComponent>
            <TextComponent text={errorMessage} color={appColors.danger} />
          </SectionComponent>
        )}

        <SpaceComponent height={16} />
        <SectionComponent>
          <ButtonComponent onPress={handleRegister} text="SIGN UP" type='primary' />
        </SectionComponent>
        <SocialLogin />
        <SectionComponent>
          <RowComponent justify="center">
            <TextComponent text="Don't have an account?" />
            <ButtonComponent type="link" text="Sign up" onPress={() => navigation.navigate('Login')} />
          </RowComponent>
        </SectionComponent>
        <LoadingModal visible={isLoading} />
      </ContainerComponent>
    </>
  );
};

export default SignUpScreen;
