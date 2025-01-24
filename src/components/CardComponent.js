import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { appColors } from '../constants/appColors'
import { fontFamilies } from '../constants/fontFamilies'
import { globalStyles } from '../styles/globalStyles'

import { SeparatorComponent, ColumnComponent, RowComponent, SectionComponent, TextComponent, ButtonComponent, SpaceComponent, DividerComponent } from './'

const CardComponent = ({
  title,
  image,
  rating,
  genres,
  flatform,
  video,
  topChart,
  number
}) => {
  return topChart ? (
    <View>
      <SectionComponent>
        <RowComponent justify={'space-between'}>
          <TextComponent 
            text={number} 
            font='bold'
            color={appColors.white}
          />
          <Image source={{ uri: image }} style={{ width: 70, height: 70, borderRadius: 15 }} />
          <ColumnComponent>
            <TextComponent
              size={16}
              text={title}
              font='bold'
              color={appColors.white}
              numberOfLines={1}
              styles={{
                width: 180
              }}
            />
            <RowComponent>
              <AntDesign name="star" size={12} color={appColors.gray6} style={{ marginRight: 4 }} />
              <TextComponent
                text={rating}
                color={appColors.gray6}
                size={12}
                styles={{ marginHorizontal: 4 }}
              />
            </RowComponent>
            <TextComponent
              text={genres}
              color={appColors.gray6}
              size={12}
              styles={{ marginHorizontal: 4 }}
            />
          </ColumnComponent>
          <ButtonComponent
              text="Download"
              textColor={appColors.green}
              borderColor={appColors.green}
              border
            />
        </RowComponent>
      </SectionComponent>
      <DividerComponent/>
    </View>
  ) : (
    <>
      <View>
        <SectionComponent>
          <RowComponent justify="space-between" textColor={appColors.primary}>
            <RowComponent>
              <Image source={{ uri: image }} style={{ width: 40, height: 40, borderRadius: 10 }} />
              <SpaceComponent width={10} />
              <ColumnComponent>
                <TextComponent
                  size={16}
                  text={title}
                  font='bold'
                  color={appColors.white}
                  numberOfLines={1}
                  styles={{
                    width: 180
                  }}
                />
                <RowComponent>
                  <AntDesign name="star" size={12} color={appColors.gray6} style={{ marginRight: 4 }} />
                  <TextComponent
                    text={rating}
                    color={appColors.gray6}
                    size={12}
                    styles={{ marginHorizontal: 4 }}
                  />
                  <TextComponent
                    text={genres}
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
        <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} />
        <SpaceComponent height={10} />
        <SectionComponent>
          <TextComponent
            text="Grand Cross: Age of Titans creates a colorfulworld with fully-voiced characters, an engaging narrative and the unique joy of castle-building."
            color={appColors.white}
          />
        </SectionComponent>
        <DividerComponent />
      </View>
    </>
  )
}

export default CardComponent