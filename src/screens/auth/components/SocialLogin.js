import { View, Text } from 'react-native'
import React from 'react'
import { ButtonComponent, SectionComponent, SpaceComponent, TextComponent } from '../../../components'
import { appColors } from '../../../constants/appColors'
import { fontFamilies } from '../../../constants/fontFamilies'
import { Facebook, Google } from '../../../assets/svgs'

const SocialLogin = () => {

    const handleLoginGoogle = async () =>{
    
    }

    return (
        <SectionComponent>
            <TextComponent
                styles={{ textAlign: 'center' }}
                text="OR"
                color={appColors.gray4}
                size={16}
                font={fontFamilies.medium}
            />
            <SpaceComponent height={16}/>
            <ButtonComponent
                type='primary'
                color={appColors.white}
                textColor={appColors.text}
                text="Login with Google"
                textFont={fontFamilies.regular}
                icon={<Google/>}
                iconFlex="left"
            />
            <ButtonComponent
                type='primary'
                color={appColors.white}
                textColor={appColors.text}
                text="Login with Facebook"
                textFont={fontFamilies.regular}
                icon={<Facebook/>}
                iconFlex="left"
            />
        </SectionComponent>
    )
}

export default SocialLogin