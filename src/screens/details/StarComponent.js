import { View, Text } from 'react-native'
import React from 'react'
import { RowComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import AntDesign from 'react-native-vector-icons/AntDesign';

const StarComponent = ({
    count
}) => {
  return (
    <View
      style={{
        width: 50
      }}
    >
      <RowComponent
        styles={{
          marginBottom: 3
        }}
      >
      {Array.from({ length: count }, (_, index) => (
          <AntDesign 
            key={index}
            name="star" 
            size={11} 
            color={appColors.gray}
          />
        ))}
      </RowComponent>
    </View>
  )
}

export default StarComponent