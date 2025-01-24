import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextComponent, RowComponent, ColumnComponent, SectionComponent } from './'
import { appColors } from '../constants/appColors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGamepad, faFire, faClock, faStar, faBell } from '@fortawesome/free-solid-svg-icons';

const CategoryComponent = ({
    index
}) => {
    const categories = [
        { iconName: faGamepad, categoryName: "Genres" },
        { iconName: faFire, categoryName: "New Releases" },
        { iconName: faClock, categoryName: "Upcoming" },
        { iconName: faStar, categoryName: "Top Rated" }
    ]
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        setSelectedIndex(index); // Cập nhật selectedIndex khi index thay đổi
    }, [index]); // useEffect chỉ chạy khi `index` thay đổi

    const renderCategory = () => categories.map((item, index) => {
        const {iconName, categoryName} = item;
        return (
            <TouchableOpacity
                onPress={() => setSelectedIndex(index)}
                key={index}
            >
                <ColumnComponent
                    styles={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <FontAwesomeIcon
                        icon={iconName}
                        size={34}
                        style={{
                            color: selectedIndex == index ? appColors.green : appColors.white
                        }}
                    />
                    <TextComponent
                        text={categoryName}
                        size={14}
                        styles={{
                            color: selectedIndex == index ? appColors.green : appColors.white,
                            fontWeight: selectedIndex == index ? 'bold' : 'medium',
                        }}
                    />
                </ColumnComponent>
            </TouchableOpacity>
        )
    })

    return (
        <View>
            <RowComponent justify="space-between">
                {renderCategory()}
            </RowComponent>
        </View>
    );
};

export default CategoryComponent;
