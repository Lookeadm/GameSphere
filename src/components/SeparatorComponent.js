import { View, Text } from 'react-native'
import React from 'react'
import TextComponent from './TextComponent'
import { appColors } from '../constants/appColors'

const SeparatorComponent = () => {
  return (
    <View>
      <TextComponent 
        text=' • '
        color={appColors.gray6}
        size={10}
    />
    </View>
  )
}

export default SeparatorComponent