import { View, Text, Image } from 'react-native'
import React from 'react'
import SectionComponent from './SectionComponent'
import TextComponent from './TextComponent'
import ButtonComponent from './ButtonComponent'
import { appColors } from '../constants/appColors'
import { fontFamilies } from '../constants/fontFamilies'
import { globalStyles } from '../styles/globalStyles'

const AppItemComponent = ({
    image,
    title
}) => {
  return (
    <>
    <View>
      <SectionComponent 
        styles={{
            width: 90
        }}
      >
        <Image source={{ uri: image }} style={{ width: 80, height:80, borderRadius: 15 }} />
        <TextComponent
            size={14}
            text={title}
            color={appColors.white}
            styles={{
              height: 50,
              overflow: 'hidden',
              width: 80
            }}
            numberOfLines={2}
        />
        <ButtonComponent
            styles={{
                width: 80,
                height: 30,
                borderWidth: 1
            }}
            text="Download"
            textColor={appColors.green}
            borderColor={appColors.green}
            border
        />
      </SectionComponent>
      
    </View>
    </>
  )
}

export default AppItemComponent