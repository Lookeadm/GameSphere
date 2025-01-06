import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { appColors } from '../constants/appColors';
import { globalStyles } from '../styles/globalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchInputComponent = ({
    value,
    onChange,
    placeholder = 'Search...',
    onSearch,
    onClear
}) => {
    return (
        <>
        <View style={[styles.searchContainer]}>
            {/* Search Icon */}
            <Ionicons 
                name="search-outline" 
                size={22} 
                color={appColors.gray} 
            />
            <TextInput 
                style={[styles.input]}
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
        </>
    )
}

export default SearchInputComponent;

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        borderRadius: 18,
        borderColor: appColors.gray3,
        width: 330,
        height: 34,
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#2A2A2A',
        marginBottom: 5
    },
    input: {
        flex: 1,
        color: '#787878',
        fontSize: 14,  // Giảm kích thước font
    }
});