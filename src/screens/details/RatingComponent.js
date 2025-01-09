import { View, Text } from 'react-native'
import React from 'react'
import { ColumnComponent, DividerComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import StarComponent from './StarComponent'

const RatingComponent = () => {

  const rating = () => {
    let elements = [];
    let i = 1; // Bắt đầu từ 1
    while (i <= 5) { // Đến 5
        elements.push(
            <RowComponent key={i} style={{ flexDirection: 'row-reverse' }}>
                <StarComponent count={i} />
                <DividerComponent rating />
            </RowComponent>
        );
        i++;
    }
    return elements.reverse(); // Đảo ngược mảng trước khi trả về
}

  return (
    <View>
          <TextComponent 
            text='Ratings & Reviews'
            color={appColors.white}
            size={17}
            font='bold'
          />
            <RowComponent
            >
              <ColumnComponent>
              <RowComponent>
                <TextComponent
                  text='8.0'
                  color={appColors.white}
                  size={50}
                  font='bold'
                />
                <TextComponent 
                  text='/10'
                  color={appColors.gray6}
                  size={17}
                />
                </RowComponent>
                <TextComponent
                  text='3k Ratings'
                  color={appColors.gray6}
                  size={13}
                  />
                </ColumnComponent>
                <SpaceComponent width={30}/>
                <View
                  style={{
                    marginEnd: 0
                  }}
                >
                {rating()}
                </View>
            </RowComponent>
    </View>
  )
}

export default RatingComponent