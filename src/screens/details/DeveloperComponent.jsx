import React from 'react';
import { View } from 'react-native';
import { appColors } from '../../constants/appColors';
import { TextComponent } from '../../components';

const DeveloperComponent = (developers) => {
    return (
        <View>
            {developers.slice(0, 1).map((developer, index) => {
                <View key={index}>
                    <TextComponent
                        text={developer.name}
                        color={appColors.gray6}
                        size={12}
                    />
                    {index < details.developers.slice(0, 1)}
                </View>
            })}
        </View>
    );
}

export default DeveloperComponent;