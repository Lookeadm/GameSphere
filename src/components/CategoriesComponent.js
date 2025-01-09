import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextComponent, RowComponent, ColumnComponent, SectionComponent } from './'
import { appColors } from '../constants/appColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const CategoryComponent = ({ 
    iconName, 
    categoryName,
    styles,
    sizeIcon,
    sizeText
}) => {
    return (
        <ColumnComponent 
            styles={{
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <FontAwesomeIcon
                icon={iconName} 
                size={sizeIcon} 
                color={appColors.white}
            />
            <TextComponent 
                text={categoryName} 
                color={appColors.white} 
                size={sizeText}  
            />
        </ColumnComponent>
    );
};

export default CategoryComponent;
