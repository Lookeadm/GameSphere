import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { RowComponent, SectionComponent, TextComponent } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { appColors } from '../../constants/appColors';

const CategoriesComponent = () => {
    return (
        <View>
            <SectionComponent>
            <RowComponent
                justify='space-between'
            >
                <TextComponent 
                    text='Game Gacha' 
                    color={appColors.white}
                    font='bold'
                    size={15}
                    />
                <TouchableOpacity
                    
                    style={{ marginRight: 12 }}
                >
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        color={appColors.white}
                        size={20}
                    />
                </TouchableOpacity>
            </RowComponent>
            </SectionComponent>
        </View>
    )
}

export default CategoriesComponent