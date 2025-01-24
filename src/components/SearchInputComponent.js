import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import React, { useRef } from 'react';
import { appColors } from '../constants/appColors';
import { globalStyles } from '../styles/globalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchInputComponent = ({
    value,
    onChange,
    placeholder = 'Search...',
    onSearch,
    onClear,
    styles1,
    home
}) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const searchInputAnimation = {
        transform: [
            {
                scaleX: animatedValue.interpolate({
                    inputRange: [0, 50],
                    outputRange: [1, 0],
                    extrapolate: 'clamp',
                })
            },
            {
                translateX: animatedValue.interpolate({
                    inputRange: [0, 25],
                    outputRange: [1, -100],
                    extrapolate: 'clamp',
                })
            },
        ],
        opacity: animatedValue.interpolate({
            inputRange: [0, 25],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        }),
    }
    const AnimatedTextInput = Animated.createAnimatedComponent(Text);
    return home ? (
        <Animated.View style={[globalStyles.searchContainer, searchInputAnimation]}>
            <Ionicons
                name="search-outline"
                size={22}
                color={appColors.gray}
            />
            <AnimatedTextInput style={[globalStyles.input, searchInputAnimation]}>Search...</AnimatedTextInput>
        </Animated.View>
    ) : (
        <View style={[styles.searchContainer]}>
            {/* Search Icon */}
            <Ionicons
                name="search-outline"
                size={22}
                color={appColors.gray}
            />
            <AnimatedTextInput
                style={[styles.input, styles1]}
                value={value}
                placeholder={placeholder}
                // onChangeText={val => onChange('')}
                placeholderTextColor={appColors.gray}
                autoCapitalize='none'
                returnKeyType="search"
                onSubmitEditing={onSearch}
                textAlignVertical="center"
            />

            {/* Clear Button */}
            {value?.length > 0 && (
                <TouchableOpacity onPress={onClear}>
                    <Ionicons
                        name="close-circle"
                        size={22}
                        color={appColors.gray}
                    />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default SearchInputComponent;

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        borderRadius: 18,
        borderColor: appColors.gray3,
        width: 330,
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#2A2A2A',
    },
    input: {
        flex: 1,
        color: '#787878',
        fontSize: 14,  // Giảm kích thước font
    }
});