import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, ContainerComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import InputComponent from '../../components/InputComponent';
import { ArrowRight, Sms } from 'iconsax-react-native';
import { appColors } from '../../constants/appColors';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  return (
    <ContainerComponent back isImageBackground>
        <SectionComponent>
            <TextComponent text="Reset Password" title/>
            <TextComponent text="Please enter your email adress to request a password reset"/>
            <SpaceComponent height={26}/>
            <InputComponent 
              value={email} 
              onChange={val => setEmail(val)} 
              affix={<Sms size={20} color={appColors.gray} />} 
              placeholder='abc@gmail.com' />
        </SectionComponent>
        <SectionComponent>
          <ButtonComponent 
            text='Send' 
            type='primary' 
            icon={<ArrowRight size={20} color={appColors.white} />} 
            iconFlex='right'
            />
        </SectionComponent>
    </ContainerComponent>
  )
}

export default ForgotPassword