import { View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import RowComponent from './RowComponent';
import { ArrowLeft } from 'iconsax-react-native';
import { appColors } from '../constants/appColors';
import TextComponent from './TextComponent';
import { fontFamilies } from '../constants/fontFamilies';

const ContainerComponent = ({
    isImageBackground,
    isScroll,
    title,
    children,
    back,
}) => {
    const navigation = useNavigation();

    const returnContainer = isScroll ? (
        <ScrollView style={{ flex: 1 }}>{children}</ScrollView>
    ) : (
        <View style={{ flex: 1 }}>{children}</View>
    );

    const headerComponent = () => {
        return(
        <View style={{ flex: 1, paddingTop: 30 }}>
            {(title || back) && (
                <RowComponent
                styles={{
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    minWidth: 48,
                    minHeight: 48,
                }}
            >
                {back && (
                    <TouchableOpacity 
                        onPress={() => navigation.goBack()} 
                        style={{marginRight: 12}}
                    >
                        <ArrowLeft size={24} color={appColors.text} />
                    </TouchableOpacity>
                )}
                {title ? (
                    <TextComponent
                        text={title}
                        size={16}
                        font={fontFamilies.medium}
                        flex={1}
                    />
                ):(
                    <></>
                )}
            </RowComponent>
            )}
            {returnContainer}
        </View>
        );
    };

    return isImageBackground ? (
        <ImageBackground
            source={require('../assets/images/login.png')}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                {headerComponent()}
            </SafeAreaView>
        </ImageBackground>
    ) : (
        <SafeAreaView style={globalStyles.container}>
            {headerComponent()}
            {returnContainer}
        </SafeAreaView>
    );
};

export default ContainerComponent;
