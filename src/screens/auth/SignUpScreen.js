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
  const [errorMessage, setErrorMessage] = useState({});

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

  const validateForm = () => {
    const errors = {};
    
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!Validate.email(values.email)) {
      errors.email = 'Invalid email format';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (!Validate.Password(values.password)) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Please confirm password';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!values.username) {
      errors.username = 'Username is required';
    }

    return errors;
  };

  const handleRegister = async () => {
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await authenticationAPI.HandleAuthentication('/register', values, 'post');
      if(res.status === 200 || res.status === 201){
        dispatch(addAuth(res.data));
        await AsyncStorage.setItem('auth', JSON.stringify(res.data));
        alert('Registration successful! Redirecting to login screen...');
        navigation.navigate('LoginScreen');
      }
    } catch (error) {
      setErrorMessage({
        submit: error.response?.data?.message || 'Registration failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            placeholder="@abc@gmail.com"
            onChange={val => handleChangeValue('email', val)}
            allowClear
            affix={<Sms size={22} color={appColors.gray} />}
            onEnd={()=>
              setErrorMessage({ ...errorMessage, email: 'Email không hợp lệ' })}
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
            {
              Object.keys(errorMessage).map((error, index) => (
              <TextComponent 
                text={errorMessage[`${error}`]}
                key={`error${index}`} 
                color={appColors.danger} />
            ))}
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
