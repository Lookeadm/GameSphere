import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { appColors } from '../constants/appColors'
import { fontFamilies } from '../constants/fontFamilies'
import { globalStyles } from '../styles/globalStyles'

import { SeparatorComponent, ColumnComponent, RowComponent, SectionComponent, TextComponent, ButtonComponent, SpaceComponent } from './'

const CardComponent = ({
  title,
  image,
  rating,
  categories,
  flatform,
  video,
  
}) => {
  return (
    <>
      <View>
        <SectionComponent>
          <SpaceComponent height={15} />
          <RowComponent justify="space-between" textColor={appColors.primary}>
            <RowComponent>
              <Image source={{ uri: image }} style={{ width: 45, height: 45, borderRadius: 10 }} />
              <SpaceComponent width={10} />
              <ColumnComponent>
                <TextComponent
                  size={16}
                  text={title}
                  fontWeight='bold'
                  color={appColors.white}
                  numberOfLines={1}
                  styles={{
                    width: 180
                  }}
                />
                <RowComponent>
                  <AntDesign name="star" size={12} color={appColors.gray6} style={{ marginRight: 4 }} />
                  <TextComponent
                    text='8.7'
                    color={appColors.gray6}
                    size={12}
                    styles={{ marginHorizontal: 4 }}
                  />
                  <SeparatorComponent />
                  <TextComponent
                    text='RPG'
                    color={appColors.gray6}
                    size={12}
                    styles={{ marginHorizontal: 4 }}
                  />
                  <SeparatorComponent />
                  <TextComponent
                    text='Story Rich'
                    color={appColors.gray6}
                    size={12}
                    styles={{ marginHorizontal: 4 }}
                  />
                </RowComponent>
              </ColumnComponent>
            </RowComponent>
            <ButtonComponent
              text="Download"
              textColor={appColors.green}
              borderColor={appColors.green}
              border
            />
          </RowComponent>
        </SectionComponent>
        <SpaceComponent height={5}/>
        <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} />
        <SpaceComponent height={10}/>
        <SectionComponent>
          <TextComponent
            text="Grand Cross: Age of Titans creates a colorfulworld with fully-voiced characters, an engaging narrative and the unique joy of castle-building."
            color={appColors.white}
          />
        </SectionComponent>
      </View>
      <View style={globalStyles.divider} />
    </>
  )
}

export default CardComponent